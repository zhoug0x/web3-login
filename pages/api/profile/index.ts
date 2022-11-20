import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import type Profile from '../../../interfaces/Profile'
import {
  create as createProfile,
  update as updateProfile,
  del as deleteProfile,
} from '../../../services/profiles'

interface ResponseData {
  data?: Profile | Profile[]
  error?: string
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  try {
    const session = await getSession({ req })
    const inputData: Profile = JSON.parse(req.body)
    const sessionAddress = session?.address
    const inputAddress = inputData?.address

    // protect routes by confirming the logged in address owns address record
    if (sessionAddress?.toLowerCase() !== inputAddress?.toLowerCase()) {
      return res.status(403).json({ error: 'invalid credentials' })
    }

    switch (req.method) {
      case 'POST':
        return res.status(201).json({ data: await createProfile(inputData) })

      case 'PUT':
        const updated = await updateProfile(inputData)
        return res
          .status(updated.length > 0 ? 200 : 404)
          .json({ data: updated })

      case 'DELETE':
        const removed = await deleteProfile(inputData)
        return res.status(removed.length > 0 ? 204 : 404).end()
      default:
        return res.status(405).json({ error: 'method not allowed' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'server error' })
  }
}
