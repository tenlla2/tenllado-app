import { useEffect, useCallback } from 'react'
import type { Pokemon, PokemonAbilities, PokemonType, PokemonStat } from '../../models/global.model'
import './Modal.scss'
import usePokemonDetails from '@/hooks/usePokemonDatails'
import closeIcon from '@/assets/close.svg'
import pokeball from '@/assets/pokeball.png'
import missingNo from '@/assets/MissingNO.webp'
import { Button } from 'tenllado-lib'
import pokebalSound from '@/assets/pokeball-sound.m4a'

interface ModalProps {
  show: boolean
  onClose: () => void
  data: Pokemon | null
}

const OPTIONS: string[] = ['stats', 'abilities', 'types']

const Modal: React.FC<ModalProps> = ({ show, onClose, data }) => {
  const { pokemonDetails, imageVariant, setImageVariant, section, setSection } = usePokemonDetails(
    data?.url,
  )

  useEffect(() => {
    if (!(show && pokemonDetails)) {
      return
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [show, onClose, pokemonDetails])

  const toggleImageVariant = useCallback((): void => {
    setImageVariant((prevVariant) =>
      prevVariant === 'front_default' ? 'back_default' : 'front_default',
    )
  }, [setImageVariant])

  const renderImagen = useCallback((): JSX.Element => {
    if (pokemonDetails) {
      return (
        <>
          <img
            className="modal-overlay__content--image"
            src={pokemonDetails.sprites[imageVariant] || missingNo}
            alt="pokemon-image"
            onLoad={() => {
              const audio = new Audio(pokebalSound)
              audio.volume = 0.2
              audio.play().catch((error) => {
                console.error('Error:', error)
              })
            }}
            data-testid="pokemon-image"
          />
          <div onClick={toggleImageVariant} className="modal-overlay__big-circle-transparent" />
        </>
      )
    }
    return (
      <>
        <img className="pokeball" src={pokeball} alt="pokeball" />
        <div className="modal-overlay__big-circle" />
        <div className="modal-overlay__mid-circle modal-overlay__mid-circle--first" />
        <div className="modal-overlay__mid-circle modal-overlay__mid-circle--second" />
        <div className="modal-overlay__mid-circle modal-overlay__mid-circle--third" />
        <div className="modal-overlay__small-circle modal-overlay__small-circle--first" />
        <div className="modal-overlay__small-circle modal-overlay__small-circle--second" />
      </>
    )
  }, [pokemonDetails, imageVariant, toggleImageVariant])

  const renderSection = useCallback((): JSX.Element => {
    switch (section) {
      case 'abilities':
        return (
          <div className="modal-overlay__content--stats-list">
            {pokemonDetails?.abilities.map((ability: PokemonAbilities, index: number) => (
              <p key={index}>{ability.ability.name || 'Not found'}</p>
            ))}
          </div>
        )
      case 'types':
        return (
          <div className="modal-overlay__content--stats-list">
            {pokemonDetails?.types.map((type: PokemonType, index: number) => (
              <p key={index}>{type.type.name || 'Not found'}</p>
            ))}
          </div>
        )
      default:
        return (
          <div className="modal-overlay__content--stats-list">
            {pokemonDetails?.stats.map((stat: PokemonStat, index: number) => (
              <p key={index}>{`${stat.stat.name}: ${stat.base_stat}` || 'Not found'}</p>
            ))}
          </div>
        )
    }
  }, [pokemonDetails, section])

  const renderNumber = useCallback((): JSX.Element => {
    return <span className="modal-overlay__content--number">N.º{pokemonDetails?.id || '?'}</span>
  }, [pokemonDetails?.id])

  const renderName = useCallback((): JSX.Element => {
    return (
      <div className="modal-overlay__content--name">
        <h2>{data?.name || 'Not found'}</h2>
      </div>
    )
  }, [data?.name])

  const buttonContainer = useCallback((): JSX.Element => {
    return (
      <div className="modal-overlay__content--button-container">
        {OPTIONS.map((option: string) => (
          <Button
            key={option}
            text={option.charAt(0).toUpperCase() + option.slice(1)}
            className={`custom-button__modal ${section === option ? 'active' : ''}`}
            onClick={() => setSection(option)}
          />
        ))}
      </div>
    )
  }, [section, setSection])

  return (
    <>
      {show && (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-overlay__content" onClick={(e) => e.stopPropagation()}>
            <img
              className="modal-overlay__content--close-icon"
              onClick={onClose}
              src={closeIcon}
              alt="Close"
            />
            {renderImagen()}
            {renderName()}
            {renderNumber()}
            {buttonContainer()}
            {renderSection()}
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
