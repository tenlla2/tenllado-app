import axios, { type AxiosInstance } from 'axios'
import type { Pokemon, PokemonDetail, PokemonListResponse } from '@/models/global.model'

class PokemonAPIService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: 'https://pokeapi.co/api/v2/',
    })
  }

  public async getAllPokemon(offset: number): Promise<{ results: Pokemon[]; count: number }> {
    try {
      const response = await this.api.get<PokemonListResponse>(`pokemon?limit=10&offset=${offset}`)
      return { results: response.data.results, count: response.data.count }
    } catch (error) {
      console.error('Error fetching Pokemon list:', error)
      throw error
    }
  }

  public async getPokemonDetail(url: string): Promise<PokemonDetail> {
    try {
      const response = await axios.get<PokemonDetail>(url)
      return response.data
    } catch (error) {
      console.error('Error fetching Pokemon detail:', error)
      throw error
    }
  }
}

export default new PokemonAPIService()
