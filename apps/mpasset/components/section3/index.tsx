import React from 'react'

import { usePersonStore } from '../../store/person'
import Filter, { SelectedFilterType } from './Filter'
import FirstChart from './first-chart'
import Loading from './Loading'
import SearchPerson from './SearchPerson'
import SelectedPersonDetail from './second-chart'
import SelectedCompanyDetail from './third-chart'

import * as d3 from 'd3';
import { PersonCustom } from '../../models/person'
import { placeZerosAtEnd } from '../util/calculation'
import { TheyWorkForUs } from '@thailand-election-2023/database'

type Props = {}

enum VIEW_TYPE {
  MAIN_VIEW = 0,
  SELCTED_PERSON_CHART = 1,
  SELECTED_COMPANY_CHART = 2
}


const Section3 = (props: Props) => {
  const [filter, setFilter] = React.useState<SelectedFilterType>({
    dataSet: 'ผู้สมัคร 66',
    businessType: 'ทุกหมวดธุรกิจ',
    party: 'ทุกพรรค',
    sort: 'สูงสุด',
  })
  const [isLoading, setIsLoading] = React.useState(true)

  const [filterPerson, setFilterPerson] = React.useState<PersonCustom[]>([])

  const {
    person, setPerson,
    selectedPerson,
    personOutlier, setPersonOutlier,
    selectedCompany,
    party, setParty,
    setTheyWorkPerson
  } = usePersonStore();

  const [view, setView] = React.useState(VIEW_TYPE.MAIN_VIEW)


  const fetchFromGit = React.useCallback(async () => {
    await d3.json<PersonCustom[]>('https://raw.githubusercontent.com/wevisdemo/thailand-election-2023/main/apps/mpasset/crawler/public/data/people.json').then((value) => {
      if (value) {
        value.forEach((d) => {
          d.totalValueShare = d.totalValueShare || 0,
            d.countCompShare = d.countCompShare || 0,
            d.countDirector = d.countDirector || 0,
            d.totalPctShare = d.totalPctShare || 0
        })
        let sortArray = value.sort((a, b) => b.totalValueShare - a.totalValueShare)
        sortArray = placeZerosAtEnd(value, 'countCompShare', 'countDirector')
        console.log('fetch from git');

        setPersonOutlier(sortArray.slice(0, 1))
        setPerson(sortArray.slice(1))

      }
    })
  }, [setPerson, setPersonOutlier])

  const fetchFromTheyWrok = React.useCallback(async () => {
    const everyPeople = await TheyWorkForUs.People.fetchAll({
      fields: 'Id,Name,Title,IsMP,IsSenator,IsActive,Images,PeoplePartyHistory',
      'nested[PeoplePartyHistory][fields]': 'Party,EstablishedDate',
    });
    setTheyWorkPerson(everyPeople)
  }, [setTheyWorkPerson])

  React.useEffect(() => {
    let ignore = false;
    if (person.length <= 0 && party.length <= 0) {
      if (!ignore) {
        fetchFromTheyWrok()
        fetchFromGit()
      }
    } else
      setIsLoading(false)
    return () => {
      ignore = true;
    }
  }, [person, setPerson, party, setParty, fetchFromGit, fetchFromTheyWrok])

  React.useLayoutEffect(() => {
    if (selectedCompany) {
      setView(VIEW_TYPE.SELECTED_COMPANY_CHART)
    } else if (selectedPerson) {
      setView(VIEW_TYPE.SELCTED_PERSON_CHART)
    } else {
      setView(VIEW_TYPE.MAIN_VIEW)
    }
  }, [selectedPerson, selectedCompany])



  const [isOpenSearchDialog, setIsOpenSearchDialog] = React.useState(false)

  if (isLoading) return <div className='h-screen flex flex-col'><Loading /></div>

  return (
    <div className='h-full inset-0 flex flex-col relative overflow-hidden'>
      {
        view === VIEW_TYPE.MAIN_VIEW &&
        <>
          <Filter selectedFilter={filter} onOpenSeachDialog={setIsOpenSearchDialog} />
          <div className='flex flex-row justify-between px-[10px]'>
            <div className='typo-b7 text-gray-3 typo-ibmplex'>*แสดงสีเฉพาะพรรคที่อยู่ในสภาสมัยล่าสุด</div>
            <div className='typo-b7 text-right'>ล้านบาท</div>
          </div>
          <FirstChart />
          <SearchPerson open={isOpenSearchDialog} onClose={() => setIsOpenSearchDialog(false)} />
        </>
      }
      {view === VIEW_TYPE.SELCTED_PERSON_CHART &&
        <SelectedPersonDetail />
      }
      {view === VIEW_TYPE.SELECTED_COMPANY_CHART &&
        <SelectedCompanyDetail />
      }
    </div>
  )
}

export default Section3