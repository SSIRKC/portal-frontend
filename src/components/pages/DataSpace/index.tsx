/********************************************************************************
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
 * distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import './UseCase.scss'
import StageSection from 'components/shared/templates/StageSection'
import { StageSubNavigation } from 'components/shared/templates/StageSubNavigation'
import { useEffect, useState } from 'react'
import CommonService, {
  type SubNavigationType,
  type DataSpaceType,
} from 'services/CommonService'
import { getAssetBase } from 'services/EnvironmentService'
import { StaticTemplateResponsive } from 'components/shared/templates/StaticTemplateResponsive'
import { useSelector } from 'react-redux'
import { languageSelector } from 'features/language/slice'

export default function DataSpace() {
  const [dataSpace, setDataSpace] = useState<DataSpaceType>()
  const [linkArray, setLinkArray] = useState<SubNavigationType[]>()
  const [isTop, setIsTop] = useState<boolean>(false)
  const language = useSelector(languageSelector)

  useEffect(() => {
    CommonService.getDataSpace((data: DataSpaceType) => {
      setDataSpace(data)
      setLinkArray(data.subNavigation)
    })
  }, [language])

  const onScroll = () => {
    setIsTop(window.scrollY > 500)
  }

  window.addEventListener('scroll', onScroll)

  return (
    <main className="dataSpace">
      {dataSpace && linkArray && (
        <>
          <StageSection
            title={dataSpace.dataSpace.title}
            description={dataSpace.dataSpace.description}
          />
          <StageSubNavigation fixHeader={isTop} linkArray={linkArray} />
          <StaticTemplateResponsive
            sectionInfo={dataSpace.dataSpace.sections}
            baseUrl={getAssetBase()}
          />
        </>
      )}
    </main>
  )
}
