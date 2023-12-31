import React from 'react'

import { createUUID } from '@/helpers/createUUID'
import { candidateFilters } from '@/mocks/candidateFilters'
import type { SelectChangeEvent } from '@mui/material'
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  ListSubheader,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

export const DropDownFilter: React.FC<{
  filters: string[]
  handleChangeSelectFilter: (event: SelectChangeEvent<string[]>) => void
}> = ({ filters, handleChangeSelectFilter }) => {
  return (
    <Box mt={2} maxWidth={300}>
      <FormControl sx={{ minWidth: 1 }} size='small'>
        <InputLabel htmlFor='grouped-select'>Filtrar</InputLabel>
        <Select
          multiple
          value={filters}
          size='small'
          id='grouped-select'
          label='Filtrar por'
          onChange={handleChangeSelectFilter}
          input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
          MenuProps={MenuProps}
          renderValue={selected => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map(value => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {candidateFilters.map(filter => [
            <ListSubheader key={createUUID()}>
              (<>{filter.category}</>)
            </ListSubheader>,
            filter.items
              ?.filter(item => !item.includes('Prefiro não declarar'))
              ?.map(item => (
                <MenuItem key={`filter-${item}`} value={item}>
                  <Checkbox checked={filters.indexOf(item) > -1} />
                  <ListItemText primary={item} />
                </MenuItem>
              )),
          ])}
        </Select>
      </FormControl>
    </Box>
  )
}
