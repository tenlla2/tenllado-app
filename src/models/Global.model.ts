export interface Pokemon {
  name: string
  url: string
}

export interface PokemonAbilities {
  ability: {
    name: string
    url: string
  }
}

export interface PokemonCries {
  latest: string
  legacy: string
}

export interface PokemonForm {
  name: string
  url: string
}

export interface PokemonGameIndex {
  game_index: number
  version: {
    name: string
    url: string
  }
}

export interface PokemonMove {
  move: {
    name: string
    url: string
  }
}

export interface PokemonSpecies {
  name: string
  url: string
}

export interface PokemonSprites {
  [key: string]: string
}

export interface PokemonStat {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export interface PokemonType {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface PokemonDetail {
  abilities: PokemonAbilities[]
  base_experience: number
  cries: PokemonCries
  forms: PokemonForm[]
  game_indices: PokemonGameIndex[]
  height: number
  held_items: unknown[]
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: PokemonMove[]
  name: string
  order: number
  past_abilities: unknown[]
  past_types: unknown[]
  species: PokemonSpecies
  sprites: PokemonSprites
  stats: PokemonStat[]
  types: PokemonType[]
  weight: number
}

export interface PaginationReturn {
  currentPage: {
    className: string
    number: number
  }
  totalPages: number
  prevButton: {
    onClick: () => void
    text: string
    className: string
    disabled: boolean
  }
  nextButton: {
    onClick: () => void
    text: string
    className: string
    disabled: boolean
  }
  className: string
}
export interface ModifiedPokemon {
  url: string
  name: string
  td: {
    button: {
      onClick: () => void
      text: string
      className: string
    }
    className: string
  }
}

export interface PokemonListResponse {
  results: Pokemon[]
  count: number
}
