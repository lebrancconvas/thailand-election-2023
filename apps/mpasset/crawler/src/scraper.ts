import { fetchAllRows } from './utils/nocodb';
import { fetchFromCreden } from './utils/creden';
import * as fs from 'fs';
import * as d3 from 'd3';

const PARTY_VIEW_ID = '40065196-c978-4d7a-b3fb-fb84694383a7';
const PEOPLE_VIEW_ID = '572c5e5c-a3d8-440f-9a70-3c4c773543ec';

interface ImageAttachment {
	title: string;
	url: string;
	mimetype: string;
}

export interface Party {
	Id: number;
	Name: string;
	Color: string | null;
	PartyType: string | null;
	IsActive: boolean | null;
	Images: ImageAttachment[] | string | null;
}

export interface Person {
	Id: number;
	Title: string;
	Name: string;
	IsMp: boolean;
	IsSenator: boolean;
	IsActive: boolean;

	// custom field
	Images: ImageAttachment[] | string | null;
	PeoplePartyHistory?: NestedPeoplePartyHistory[];
	Party: {
		Id: number;
		Name: string;
		Color?: string | null;
		Images?: string | null;
	} | null;
	countDirector: number;
	countCompShare: number;
	totalValueShare: number;
	totalPctShare: number;
}

export interface NestedPeoplePartyHistory {
	EstablishedDate: string;
	Party: {
		Id: number;
		Name: string;
	};
}

export const fetchFromThetWork = async (): Promise<{
	party: Party[];
	people: Person[];
}> => {
	console.log(`Fetch Party`);
	let party = await fetchAllRows<Party>(PARTY_VIEW_ID, {
		fields: 'Id,Name,Color,PartyType,Images,IsActive',
	});

	party.forEach((p) => {
		if (p.Images && p.Images.length) {
			if (Array.isArray(p.Images)) p.Images = p.Images[0].url;
		}
	});
	party = party.filter((p) => p.IsActive === true);

	console.log(`Fetch People`);
	let people = await fetchAllRows<Person>(PEOPLE_VIEW_ID, {
		fields: 'Id,Name,Title,IsMP,IsSenator,IsActive,Images,PeoplePartyHistory',
		'nested[PeoplePartyHistory][fields]': 'Party,EstablishedDate',
	});

	people.forEach((p) => {
		if (p.Images && p.Images.length) {
			if (Array.isArray(p.Images)) p.Images = p.Images[0].url;
			if (Array.isArray(p.PeoplePartyHistory)) {
				p.Party = p.PeoplePartyHistory[p.PeoplePartyHistory.length - 1]?.Party;
				delete p.PeoplePartyHistory;
			}
		}
	});
	people = people.filter((p) => p.IsActive === true);
	people = people.map((p) => {
		if (!p.Party?.Id) {
			return { ...p, Party: null };
		}
		const relatedParty = party.find(
			(d) => p.Party !== null && d.Id && d.Id === p.Party.Id
		);

		if (relatedParty) {
			return {
				...p,
				Party: {
					...p.Party,
					Color: relatedParty.Color,
					Images:
						typeof relatedParty.Images === 'string'
							? relatedParty.Images
							: null,
				},
			};
		} else {
			return p;
		}
	});

	return {
		party,
		people,
	};
};

interface CredenResult {
	financial: {
		year: string;
		income: number;
	}[];
	value_share: number;
	reg_date: string;
	count_shareholder: number;
	pct_share: number;
	company_name_th: string;
	company_id: string;
	obj_tname: string;
	ompany_name_en: string;
	tsic: string;
	cap_amt: number;
	company_value: number;
	company_type_th: string;
	submit_obj_big_type: string;
	full_address: string;
}
[];

export const fetchShareholderData = async (people: Person[]) => {
	const request: Promise<{
		result: string | void;
		fullname: string;
	}>[] = [];
	people.forEach((p) => {
		request.push(fetchFromCreden(p.Name, 'shareholder'));
	});

	let company: CredenResult[] = [];
	let peopleProcess: Person[] = people;

	await Promise.all(request)
		.then((value) => {
			if (value.length > 0) {
				value.forEach((v, i) => {
					const { result, fullname } = v;

					if (result) {
						const { success, data } = JSON.parse(result) as {
							success: boolean;
							msg?: string;
							data: CredenResult[];
						};

						let totalValueShare = 0;

						if (success && data) {
							company = [...company, ...data];
							fs.writeFileSync(
								`./public/data/creden/shareholder/${String(fullname).replaceAll(
									' ',
									'-'
								)}.json`,
								JSON.stringify(data)
							);

							// sum value share of all company
							totalValueShare = data.reduce(
								(acc, cur) => acc + Number(cur.value_share),
								0
							);
						}
						peopleProcess[i].totalValueShare = totalValueShare;
						peopleProcess[i].countCompShare = data ? data.length : 0;
					}
				});
			}
		})
		.then(() => {
			peopleProcess.sort((a, b) => b.totalValueShare - a.totalValueShare);

			let max =
				d3.max(peopleProcess.slice(1), (d) => Number(d.totalValueShare)) || 100;
			let scalePercentage = d3.scaleLinear().domain([0, max]).range([0, 100]);
			peopleProcess.forEach((p) => {
				p.totalPctShare = scalePercentage(p.totalValueShare);
			});

			fs.writeFileSync(
				`./public/data/people.json`,
				JSON.stringify(peopleProcess)
			);
		});

	fs.writeFileSync(
		`./public/data/creden/shareholder/all-company-shareholder.json`,
		JSON.stringify(company)
	);
};

export const fetchDirectorData = async (people: Person[]) => {
	const request: Promise<{
		result: string | void;
		fullname: string;
	}>[] = [];
	people.forEach((p) => {
		request.push(fetchFromCreden(p.Name, 'director'));
	});

	let company: CredenResult[] = [];
	let peopleProcess: Person[] = people;

	await Promise.all(request)
		.then((value) => {
			if (value.length > 0) {
				value.forEach((v, i) => {
					const { result, fullname } = v;

					if (result) {
						const { success, data } = JSON.parse(result) as {
							success: boolean;
							msg?: string;
							data: CredenResult[];
						};

						let totalValueShare = 0;

						if (success && data) {
							company = [...company, ...data];
							fs.writeFileSync(
								`./public/data/creden/director/${String(fullname).replaceAll(
									' ',
									'-'
								)}.json`,
								JSON.stringify(data)
							);

							// sum value share of all company
							// totalValueShare = data.reduce(
							// 	(acc, cur) => acc + Number(cur.value_share),
							// 	0
							// );
						}
						// peopleProcess[i].totalValueShare = totalValueShare;
						peopleProcess[i].countDirector = data ? data.length : 0;
					}
				});
			}
		})
		.then(() => {
			fs.writeFileSync(
				`./public/data/people.json`,
				JSON.stringify(peopleProcess)
			);
		});

	fs.writeFileSync(
		`./public/data/creden/director/all-company-director.json`,
		JSON.stringify(company)
	);
};
