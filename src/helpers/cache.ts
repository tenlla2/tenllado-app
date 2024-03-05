import type { PokemonListResponse, PokemonDetail } from '../models/global.model'

class PokemonCache {
  private static instance: PokemonCache
  private pokemonListCache: Map<number, PokemonListResponse>
  private pokemonDetailCache: Map<string, PokemonDetail>

  private constructor() {
    this.pokemonListCache = new Map<number, PokemonListResponse>()
    this.pokemonDetailCache = new Map<string, PokemonDetail>()
  }

  public static getInstance(): PokemonCache {
    if (!PokemonCache.instance) {
      PokemonCache.instance = new PokemonCache()
    }
    return PokemonCache.instance
  }

  public setPokemonListPage(page: number, data: PokemonListResponse): void {
    this.pokemonListCache.set(page, data)
  }

  public getPokemonListPage(page: number): PokemonListResponse | undefined {
    return this.pokemonListCache.get(page)
  }

  public setPokemonDetail(name: string, data: PokemonDetail): void {
    this.pokemonDetailCache.set(name, data)
  }

  public getPokemonDetail(name: string): PokemonDetail | undefined {
    return this.pokemonDetailCache.get(name)
  }
}

export default PokemonCache
