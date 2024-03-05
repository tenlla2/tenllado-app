import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  type Dispatch,
  type SetStateAction,
} from 'react'
import pokemonAPIService from '@/service/apiService'
import { modifyPokemonForTable, pagination, COLUMNS } from '../helpers/table'
import type { ModifiedPokemon, PaginationReturn, Pokemon } from '@/models/global.model'
import PokemonCache from '../helpers/cache'

interface UseGetDataTableReturn {
  dataFixed: ModifiedPokemon[]
  currentPage: number
  totalPages: number
  handlePageChange: (page: number) => void
  selectedPokemon: Pokemon | null
  setSelectedPokemon: Dispatch<SetStateAction<Pokemon | null>>
  paginationConfig: PaginationReturn
  COLUMNS: string[]
  handleCloseDetails: () => void
}

const useGetDataTable = (): UseGetDataTableReturn => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)

  const cache = PokemonCache.getInstance()

  const fetchData = useCallback(
    async (page: number): Promise<void> => {
      try {
        const cachedData = cache.getPokemonListPage(page)
        if (cachedData) {
          setPokemons(cachedData.results)
          setTotalPages(Math.ceil(cachedData.count / 10))
        } else {
          const offset = (page - 1) * 10
          const response = await pokemonAPIService.getAllPokemon(offset)
          setPokemons(response.results)
          setTotalPages(Math.ceil(response.count / 10))
          cache.setPokemonListPage(page, response)
        }
      } catch (error) {
        console.error('Error fetching Pokemon list:', error)
      }
    },
    [cache],
  )

  useEffect(() => {
    fetchData(currentPage)
  }, [fetchData, currentPage])

  const handlePokemonDetails = useCallback((pokemon: Pokemon): void => {
    setSelectedPokemon(pokemon)
  }, [])

  const handlePageChange = useCallback(
    (page: number): void => {
      setCurrentPage(Math.max(1, Math.min(page, totalPages)))
    },
    [totalPages],
  )

  const handleCloseDetails = useCallback((): void => {
    setSelectedPokemon(null)
  }, [])

  const dataFixed: ModifiedPokemon[] = useMemo(() => {
    return pokemons.map((pokemon: Pokemon) => modifyPokemonForTable(pokemon, handlePokemonDetails))
  }, [pokemons, handlePokemonDetails])

  const paginationConfig: PaginationReturn = useMemo(() => {
    return pagination(
      currentPage,
      totalPages,
      { onClick: () => handlePageChange(currentPage - 1) },
      { onClick: () => handlePageChange(currentPage + 1) },
    )
  }, [currentPage, totalPages, handlePageChange])

  return {
    dataFixed,
    currentPage,
    totalPages,
    handlePageChange,
    selectedPokemon,
    setSelectedPokemon,
    paginationConfig,
    COLUMNS,
    handleCloseDetails,
  }
}

export default useGetDataTable
