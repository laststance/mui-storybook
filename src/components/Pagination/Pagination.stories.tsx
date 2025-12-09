import Pagination from '@mui/material/Pagination'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import React from 'react'
import { expect, fn, userEvent, within } from 'storybook/test'

import {
  muiColorArgType,
  muiDisabledArgType,
  createSelectArgType,
  createNumberArgType,
} from '../../../.storybook/argTypeTemplates'

import PaginationComponent from './Pagination'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Navigation/Pagination',
  component: PaginationComponent,
  tags: [], // autodocs disabled - using custom MDX documentation
  // ═══════════════════════════════════════════════════════════════
  // ArgTypes Configuration
  // ═══════════════════════════════════════════════════════════════
  argTypes: {
    count: createNumberArgType(
      'The total number of pages.',
      10,
      1,
      100,
      'Content',
    ),
    page: createNumberArgType('The current page.', 1, 1, 100, 'State'),
    color: muiColorArgType,
    variant: createSelectArgType(
      ['text', 'outlined'],
      'text',
      'The variant to use.',
      'Appearance',
    ),
    shape: createSelectArgType(
      ['circular', 'rounded'],
      'circular',
      'The shape of the pagination items.',
      'Appearance',
    ),
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'The size of the component.',
      table: {
        defaultValue: { summary: 'medium' },
        category: 'Appearance',
        type: { summary: '"small" | "medium" | "large"' },
      },
    },
    disabled: muiDisabledArgType,
    siblingCount: createNumberArgType(
      'Number of always visible pages before and after the current page.',
      1,
      0,
      5,
      'Content',
    ),
    boundaryCount: createNumberArgType(
      'Number of always visible pages at the beginning and end.',
      1,
      0,
      5,
      'Content',
    ),
  },
} satisfies Meta<typeof PaginationComponent>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Interactive playground for the Pagination component.
 * Use the Controls panel to experiment with all props.
 */
export const Playground: Story = {
  args: {
    count: 10,
    color: 'primary',
    variant: 'text',
    shape: 'circular',
    size: 'medium',
    disabled: false,
  },
}

export const Default: Story = {
  args: {
    count: 10,
  },
}

export function Basic() {
  return (
    <Stack spacing={2}>
      <Pagination count={10} />
      <Pagination count={10} color="primary" />
      <Pagination count={10} color="secondary" />
      <Pagination count={10} disabled />
    </Stack>
  )
}

export function Outlined() {
  return (
    <Stack spacing={2}>
      <Pagination count={10} variant="outlined" />
      <Pagination count={10} variant="outlined" color="primary" />
      <Pagination count={10} variant="outlined" color="secondary" />
      <Pagination count={10} variant="outlined" disabled />
    </Stack>
  )
}

export function Rounded() {
  return (
    <Stack spacing={2}>
      <Pagination count={10} shape="rounded" />
      <Pagination count={10} variant="outlined" shape="rounded" />
    </Stack>
  )
}

export function Sizes() {
  return (
    <Stack spacing={2}>
      <Pagination count={10} size="small" />
      <Pagination count={10} />
      <Pagination count={10} size="large" />
    </Stack>
  )
}

export function Colors() {
  return (
    <Stack spacing={2}>
      <Pagination count={10} />
      <Pagination count={10} color="primary" />
      <Pagination count={10} color="secondary" />
      <Pagination count={10} variant="outlined" />
      <Pagination count={10} variant="outlined" color="primary" />
      <Pagination count={10} variant="outlined" color="secondary" />
    </Stack>
  )
}

export function Ranges() {
  return (
    <Stack spacing={2}>
      <Pagination count={11} defaultPage={6} siblingCount={0} />
      <Pagination count={11} defaultPage={6} />
      <Pagination
        count={11}
        defaultPage={6}
        siblingCount={0}
        boundaryCount={2}
      />
      <Pagination count={11} defaultPage={6} boundaryCount={2} />
    </Stack>
  )
}

export function Controlled() {
  const [page, setPage] = React.useState(1)

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  return (
    <Stack spacing={2}>
      <Pagination count={10} page={page} onChange={handleChange} />
      <div>Current page: {page}</div>
    </Stack>
  )
}

/**
 * Creates sample data rows for table pagination example.
 * @param count - Number of rows to create
 * @returns Array of row objects with id and name
 * @example
 * createData(5) // => [{ id: 0, name: 'Item 0' }, ...]
 */
const createData = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
  }))
}

export function WithTablePagination() {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const rows = createData(25)

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

export const InteractionTest: Story = {
  args: {} as never,
  render: () => {
    const [page, setPage] = React.useState(1)
    const handleChange = fn(
      (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
      },
    )

    return (
      <Stack spacing={2} data-testid="pagination-container">
        <Pagination count={10} page={page} onChange={handleChange} />
        <div>Current page: {page}</div>
      </Stack>
    )
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify initial render on page 1', async () => {
      const pagination = canvas.getByRole('navigation')
      await expect(pagination).toBeInTheDocument()
      await expect(canvas.getByText('Current page: 1')).toBeInTheDocument()

      const page1Button = canvas.getByRole('button', { name: 'page 1' })
      await expect(page1Button).toHaveAttribute('aria-current', 'page')
    })

    await step('Navigate to page 2', async () => {
      const page2Button = canvas.getByRole('button', { name: 'Go to page 2' })
      await userEvent.click(page2Button)

      await expect(canvas.getByText('Current page: 2')).toBeInTheDocument()
      const page2CurrentButton = canvas.getByRole('button', { name: 'page 2' })
      await expect(page2CurrentButton).toHaveAttribute('aria-current', 'page')
    })

    await step('Navigate to page 5 using direct page button', async () => {
      const page5Button = canvas.getByRole('button', { name: 'Go to page 5' })
      await userEvent.click(page5Button)

      await expect(canvas.getByText('Current page: 5')).toBeInTheDocument()
    })

    await step('Navigate to next page using next button', async () => {
      const nextButton = canvas.getByRole('button', {
        name: 'Go to next page',
      })
      await userEvent.click(nextButton)

      await expect(canvas.getByText('Current page: 6')).toBeInTheDocument()
    })

    await step('Navigate to previous page using previous button', async () => {
      const prevButton = canvas.getByRole('button', {
        name: 'Go to previous page',
      })
      await userEvent.click(prevButton)

      await expect(canvas.getByText('Current page: 5')).toBeInTheDocument()
    })

    await step('Navigate to last page', async () => {
      const page10Button = canvas.getByRole('button', { name: 'Go to page 10' })
      await userEvent.click(page10Button)

      await expect(canvas.getByText('Current page: 10')).toBeInTheDocument()
      const page10CurrentButton = canvas.getByRole('button', {
        name: 'page 10',
      })
      await expect(page10CurrentButton).toHaveAttribute('aria-current', 'true')

      // Next button should be disabled on last page
      const nextButton = canvas.getByRole('button', {
        name: 'Go to next page',
      })
      await expect(nextButton).toBeDisabled()
    })

    await step('Navigate back to first page', async () => {
      const page1Button = canvas.getByRole('button', { name: 'Go to page 1' })
      await userEvent.click(page1Button)

      await expect(canvas.getByText('Current page: 1')).toBeInTheDocument()

      // Previous button should be disabled on first page
      const prevButton = canvas.getByRole('button', {
        name: 'Go to previous page',
      })
      await expect(prevButton).toBeDisabled()
    })
  },
}
