import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'lcr93pvi',
  dataset: 'production',
  apiVersion: 'v1',
  token:'skz5kHVUaLctdoGkRFQOAQ1h7HX0VHIDubROUNbe5z6ZClMVfkaYACXgO8VNv3a45wg5P1Ij122JZhLIEMh0rzJhlIWwUcfXip78NXyrRQTF0GCXZLsD9NOFpVkWbGAqYjjnCRIWLSCwRiYZzmhQPEpc6giCNwa8fOxquAKDGsFLDP5OBVaA',
  useCdn: false,
})
