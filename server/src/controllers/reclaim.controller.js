import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk';

const APP_ID = '0x624D6A92A5E75629c8352a8f105B7a222C7a6B6D';
const PROVIDER_ID = 'b00f9875-ed44-4e08-b820-458f25dc5493';
const APP_SECRET = '0x35fc484587319846b796178eee283c1d4151098a1e5af395e4f0efd110f7b2c8';

export const initializeReclaim = async (req, res) => {
  console.log('initializeReclaim ----------- ');
  try {
    const reclaimProofRequest = await ReclaimProofRequest.init(APP_ID, APP_SECRET, PROVIDER_ID, {
      log: true,
    });

    reclaimProofRequest.addContext('0x9ccCA0a968A9bc5916E0de43Ea2D68321655ae67', 'User registration proof');

    const reclaimProofRequestConfig = reclaimProofRequest.toJsonString();

    return res.json({ reclaimProofRequestConfig });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
