import React from 'react'

import { usePersonStore } from '../../store/person'
import { LoadingScreen } from './Loading'

import { TheyWorkForUs } from '@thailand-election-2023/database'
import * as d3 from 'd3'
import dynamic from 'next/dynamic'
import { PersonCustom } from '../../models/person'
import { placeZerosAtEnd } from '../util/calculation'

const FirstChart = dynamic(() => import('./first-chart'), { loading: () => <LoadingScreen /> })
const SecondChart = dynamic(() => import('./second-chart'), { loading: () => <LoadingScreen /> })
const ThirdChart = dynamic(() => import('./third-chart'), { loading: () => <LoadingScreen /> })


type Props = {}

enum VIEW_TYPE {
  MAIN_VIEW = 0,
  SELCTED_PERSON_CHART = 1,
  SELECTED_COMPANY_CHART = 2
}


const Section3 = (props: Props) => {
  const [isLoading, setIsLoading] = React.useState(true)

  const {
    person, setPerson,
    selectedPerson,
    setPersonOutlier,
    selectedCompany,
    party, setParty,
    filterPerson, setFilterPerson,
    selectedBusinessType,
    selectedParty,
    selectedSort
  } = usePersonStore();

  const [view, setView] = React.useState(VIEW_TYPE.MAIN_VIEW)

  const fetchFromTheyWork = React.useCallback(async () => {
    const party = await TheyWorkForUs.Parties.fetch();
    setParty(party.list)
  }, [setParty])
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
        const outlier = sortArray.slice(0, 1)
        setPersonOutlier(sortArray.slice(0, 1))
        setPerson([...outlier.map((d) => ({ ...d, totalPctShare: 30 })), ...sortArray.slice(1)])
        setFilterPerson(sortArray.slice(1))
      }
    })
  }, [setPerson, setPersonOutlier, setFilterPerson])

  React.useEffect(() => {
    let ignore = false;
    if (person.length <= 0 && party.length <= 0) {
      if (!ignore) {
        fetchFromGit()
        fetchFromTheyWork()
      }
    } else
      setIsLoading(false)
    return () => {
      ignore = true;
    }
  }, [person, setPerson, party, setParty, fetchFromGit, fetchFromTheyWork])

  React.useLayoutEffect(() => {
    if (selectedCompany) {
      setView(VIEW_TYPE.SELECTED_COMPANY_CHART)
    } else if (selectedPerson) {
      setView(VIEW_TYPE.SELCTED_PERSON_CHART)
    } else {
      setView(VIEW_TYPE.MAIN_VIEW)
    }
  }, [selectedPerson, selectedCompany])


  React.useLayoutEffect(() => {
    if (person.length > 0) {
      let outFilter = person
      if (selectedBusinessType && selectedBusinessType.code !== 'all') {
        outFilter = outFilter.filter((d) => d.companyType.includes(selectedBusinessType.code))
      }
      if (selectedParty && selectedParty.Name !== 'ทุกพรรค') {
        outFilter = outFilter.filter((p) => p.Party?.Id === selectedParty?.Id)
      }
      if (selectedSort === 'desc')
        outFilter = outFilter.sort((a, b) => b.totalValueShare - a.totalValueShare)
      else
        outFilter = outFilter.sort((a, b) => a.totalValueShare - b.totalValueShare)


      setFilterPerson(placeZerosAtEnd(outFilter, 'countCompShare', 'countDirector'))
      console.log(selectedSort);

    }
  }, [selectedBusinessType, selectedParty, selectedSort, setFilterPerson, person])

  React.useEffect(() => {
    if (person.length > 0) {

    }
  }, [selectedParty, setFilterPerson, person])

  if (isLoading) return <LoadingScreen />

  if (view === VIEW_TYPE.MAIN_VIEW) return <div className='h-full inset-0 flex flex-col relative overflow-hidden'><FirstChart /></div>;
  if (view === VIEW_TYPE.SELCTED_PERSON_CHART) return <div className='h-full inset-0 flex flex-col relative overflow-hidden'><SecondChart /></div>;
  if (view === VIEW_TYPE.SELECTED_COMPANY_CHART) return <div className='h-full inset-0 flex flex-col relative overflow-hidden'><ThirdChart /></div>;

  return <LoadingScreen />
}

export default Section3