export default async (req, res) => {
  const { userAddress } = req.body;

  const userDoc = {
    _type: 'users',
    _id: `${userAddress}-user`,
    name: 'Unnamed',
    walletAddress: userAddress,
  }
}