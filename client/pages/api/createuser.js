import { client } from '../../lib/client'

export default async (req, res) => {
  const { userAddress } = req.body

  const userDoc = {
    _type: 'users',
    _id: `${userAddress}-user`,
    name: userAddress,
    walletAddress: userAddress,
  }

  try {
    await client.createIfNotExists(userDoc)

    res.status(200).send('Successful')
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}