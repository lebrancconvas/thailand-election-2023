import { writable } from 'svelte/store';
import { TheyWorkForUs } from '@thailand-election-2023/database';
import type { Party as FullParty } from '@thailand-election-2023/database';
import { PartySide } from '@thailand-election-2023/database';

export type Party = Pick<FullParty, 'Name' | 'Color' | 'PartyGroup' | 'Images'>;

type PartyMap = Map<Party['Name'], Party>;
interface PartyStore {
	list: Party[];
	map: PartyMap;
}

const DEFAULT_PARTY_COLOR = '#CCCCCC';

const createPartiesStore = () => {
	const { subscribe, update } = writable<PartyStore>({
		list: [],
		map: new Map(),
	});

	return {
		subscribe,
		load: async () => {
			const list = (
				await TheyWorkForUs.Parties.fetchAll({
					fields: 'Name,Color,PartyGroup,Images',
					where: '(PartyType,eq,พรรค)',
				})
			).map(({ Color, ...rest }) => ({
				...rest,
				Color: Color || DEFAULT_PARTY_COLOR,
			}));

			const map: PartyMap = new Map(list.map((party) => [party.Name, party]));

			update(() => ({
				list,
				map,
			}));
		},
		add: (partialParty: Partial<Party>) => {
			const party = {
				Name: '',
				Color: DEFAULT_PARTY_COLOR,
				PartyGroup: 'ฝ่ายค้าน',
				Images: null,
				...partialParty,
			};

			update(({ list, map }) => ({
				list: [...list, party],
				map: map.set(party.Name, party),
			}));
		},
		toggleSide: (partyName?: string) =>
			update(({ list, ...state }) => ({
				...state,
				list: list.map((party) =>
					!partyName || party.Name === partyName
						? {
								...party,
								PartyGroup:
									party.PartyGroup === PartySide.Government
										? PartySide.Opposition
										: PartySide.Government,
						  }
						: party
				),
			})),
	};
};

export const party = createPartiesStore();
