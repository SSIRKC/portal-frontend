/********************************************************************************
 * Copyright (c) 2021, 2023 Mercedes-Benz Group AG and BMW Group AG
 * Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import type { ProviderProps, linkProps } from '../StaticTypes'
import { Box } from '@mui/material'
import { Typography } from '@catena-x/portal-shared-components'
import '../StaticTemplate.scss'

export default function LinkButtonGrid({
  provider,
  grid = 3,
}: {
  provider: ProviderProps
  grid: number
}) {
  return (
    <>
      {provider.linksRow1 && (
        <Box
          className={'linkGridContainer'}
          sx={{
            gridTemplateColumns: `repeat(${grid}, 1fr)`,
          }}
        >
          {provider.linksRow1.map((link: linkProps) => (
            <Box
              key={link.title}
              className={'linkBox'}
              sx={{
                backgroundColor: link.background,
                width: `${100 / grid}%`,
              }}
              onClick={() => {
                window.open(link.navigate, '_blank')
              }}
            >
              <Typography variant="h5">{link.title}</Typography>
            </Box>
          ))}
        </Box>
      )}
      {provider.linksRow2 && (
        <Box
          className={'linkGridContainer'}
          sx={{
            gridTemplateColumns: `repeat(${grid}, 1fr)`,
            marginTop: '30px',
          }}
        >
          {provider.linksRow2.map((link: linkProps) => (
            <Box
              key={link.title}
              className={'linkBox'}
              sx={{
                backgroundColor: link.background,
                width: `${100 / grid}%`,
              }}
              onClick={() => {
                window.open(link.navigate, '_blank')
              }}
            >
              <Typography variant="h5">{link.title}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </>
  )
}
