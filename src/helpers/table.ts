import type { ModifiedPokemon, PaginationReturn, Pokemon } from '@/models/global.model.ts'

export function modifyPokemonForTable(
  pokemon: Pokemon,
  onClick: (pokemon: Pokemon) => void,
): ModifiedPokemon {
  return {
    url: pokemon.url,
    name: pokemon.name,
    td: {
      button: {
        onClick: () => onClick(pokemon),
        text: 'Details',
        className: 'custom-button__table',
      },
      className: 'details',
    },
  }
}

export const pagination = (
  currentPage: number,
  totalPages: number,
  onClickPrev: { onClick: () => void },
  onClickNext: { onClick: () => void },
): PaginationReturn => {
  return {
    currentPage: {
      className: 'pagination__page',
      number: currentPage,
    },
    totalPages,
    prevButton: {
      onClick: () => onClickPrev.onClick(),
      text: 'Previous',
      className: 'custom-button__pagination',
      disabled: currentPage === 1,
    },
    nextButton: {
      onClick: () => onClickNext.onClick(),
      text: 'Next',
      className: 'custom-button__pagination',
      disabled: currentPage === totalPages,
    },
    className: 'pagination',
  }
}

export const COLUMNS: string[] = ['Name', 'Details']
