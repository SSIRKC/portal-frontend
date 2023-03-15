/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
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

import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serviceIdSelector } from 'features/appManagement/slice'
import {
  useUpdateServiceAgreementConsentsMutation,
  useUpdateDocumentUploadMutation,
  useFetchNewDocumentByIdMutation,
  useFetchServiceStatusQuery,
  useFetchServiceAgreementDataQuery,
  useFetchServiceConsentDataQuery,
} from 'features/appManagement/apiSlice'
import { setServiceStatus } from 'features/appManagement/actions'
import CommonContractAndConsent from '../components/CommonContractAndConsent'

export default function OfferContractAndConsent() {
  const { t } = useTranslation('servicerelease')
  const dispatch = useDispatch()
  const serviceId = useSelector(serviceIdSelector)
  const fetchAgreementData = useFetchServiceAgreementDataQuery().data
  const fetchConsentData = useFetchServiceConsentDataQuery(serviceId ?? '').data
  const [updateAgreementConsents] = useUpdateServiceAgreementConsentsMutation()
  const [updateDocumentUpload] = useUpdateDocumentUploadMutation()
  const fetchServiceStatus = useFetchServiceStatusQuery(serviceId ?? '', {
    refetchOnMountOrArgChange: true,
  }).data
  const [getDocumentById] = useFetchNewDocumentByIdMutation()

  useEffect(() => {
    dispatch(setServiceStatus(fetchServiceStatus))
  }, [dispatch, fetchServiceStatus])

  return (
    <div className="contract-consent">
      <CommonContractAndConsent
        stepperTitle={t('step3.headerTitle')}
        stepperDescription={t('step3.headerDescription')}
        checkBoxMandatoryText={t('serviceReleaseForm.isMandatory')}
        imageFieldLabel={t('step3.uploadImageConformity')}
        pageSnackbarDescription={t(
          'serviceReleaseForm.dataSavedSuccessMessage'
        )}
        pageNotificationObject={{
          title: t('serviceReleaseForm.error.title'),
          description: t('serviceReleaseForm.error.message'),
        }}
        imageFieldNoDescription={t('serviceReleaseForm.OnlyOneFileAllowed')}
        imageFieldNote={t('serviceReleaseForm.note')}
        imageFieldRequiredText={t('serviceReleaseForm.fileUploadIsMandatory')}
        id={serviceId}
        fetchAgreementData={fetchAgreementData}
        fetchConsentData={fetchConsentData}
        updateAgreementConsents={updateAgreementConsents}
        updateDocumentUpload={updateDocumentUpload}
        fetchDataStatus={fetchServiceStatus}
        getDocumentById={getDocumentById}
      />
    </div>
  )
}
