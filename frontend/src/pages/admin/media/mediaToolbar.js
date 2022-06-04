import React from 'react'

import {
    GridToolbarExport,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid'

import { GridToolbarQuickFilter } from '@mui/x-data-grid'

import { Box } from '@mui/material'

function MediaToolbar() {
    return (
        <Box>
            <Box
                sx={{
                    padding: '10px 10px 10px 10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                <Box pr={5} sx={{ display: 'flex' }}>
                    <GridToolbarColumnsButton
                        sx={{ fontSize: '12px', marginRight: '10px' }}
                    />
                    <GridToolbarFilterButton
                        sx={{ fontSize: '12px', marginRight: '10px' }}
                    />
                    <GridToolbarDensitySelector
                        sx={{ fontSize: '12px', marginRight: '10px' }}
                    />
                    <GridToolbarExport
                        sx={{ fontSize: '12px', marginRight: '10px' }}
                    />
                </Box>
                <Box pr={4}>
                    <GridToolbarQuickFilter sx={{ fontSize: '12px' }} />
                </Box>
            </Box>
        </Box>
    )
}
export default MediaToolbar
