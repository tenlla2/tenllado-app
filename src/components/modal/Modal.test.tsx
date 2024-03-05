import { fireEvent, render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import Modal from './Modal'

const mockData = {
  url: 'test',
  name: 'Pikachu',
}

const { getByText, getByAltText } = render(<Modal show={true} onClose={() => {}} data={mockData} />)

describe('Modal Component', () => {
  it('renders with provided data', () => {
    expect(getByText('Pikachu')).toBeInTheDocument()
    fireEvent.click(getByAltText('Close'))
  })

  it('renders without provided data', () => {
    const { getByText, getByAltText } = render(<Modal show={true} onClose={() => {}} data={null} />)
    expect(getByText('Not found')).toBeInTheDocument()
    expect(getByText('N.º?')).toBeInTheDocument()
    expect(getByAltText('pokeball')).toBeInTheDocument()
  })
})
