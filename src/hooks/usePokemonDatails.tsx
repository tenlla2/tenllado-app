import { useEffect, useState, useCallback } from 'react'
import type { PokemonDetail } from '@/models/global.model.ts'
import pokemonAPIService from '../service/apiService'
import PokemonCache from '../helpers/cache'

interface UsePokemonDetailsReturn {
  pokemonDetails: PokemonDetail | null
  section: string
  setSection: React.Dispatch<React.SetStateAction<string>>
  imageVariant: string
  setImageVariant: React.Dispatch<React.SetStateAction<string>>
}

const usePokemonDetails = (url: string | undefined): UsePokemonDetailsReturn => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetail | null>(null)
  const [section, setSection] = useState<string>('stats')
  const [imageVariant, setImageVariant] = useState<string>('front_default')

  const cache = PokemonCache.getInstance()

  const fetchPokemonDetail = useCallback(
    async (url: string): Promise<void> => {
      try {
        const cachedDetail = cache.getPokemonDetail(url)
        if (cachedDetail) {
          setPokemonDetails(cachedDetail)
        } else {
          const detail: PokemonDetail = await pokemonAPIService.getPokemonDetail(url)
          setPokemonDetails(detail)
          cache.setPokemonDetail(url, detail)
        }
      } catch (error) {
        console.error('Error fetching Pokemon detail:', error)
      }
    },
    [cache],
  )

  useEffect(() => {
    let timer: number
    const fetchData = async () => {
      if (url) {
        timer = setTimeout(() => {
          fetchPokemonDetail(url)
        }, 500)
      }
    }

    fetchData()

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [url, fetchPokemonDetail])

  return {
    pokemonDetails,
    section,
    setSection,
    imageVariant,
    setImageVariant,
  }
}

export default usePokemonDetails
