import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Delete } from '@mui/icons-material'
import { Campaign, SubCampaign } from './CampaignApp'

interface TableAdsProps {
  submitted: boolean
  campaign: Campaign
  setCampaign: Function
  activeSubCampaign: SubCampaign
  handleAdAdd: Function
  activeSubCampaignIndex: number
  handleDeleteAd: Function
}

const TableAds = ({
  submitted,
  campaign,
  setCampaign,
  activeSubCampaign,
  handleAdAdd,
  activeSubCampaignIndex,
  handleDeleteAd,
}: TableAdsProps) => {
  return (
    <div>
      <TableContainer>
        <div
          style={{
            display: 'flex',
            fontSize: '22px',
            fontWeight: '400',
            marginTop: '20px',
          }}
        >
          DANH SÁCH QUẢNG CÁO
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell sx={{ fontSize: 16 }}>Tên quảng cáo*</TableCell>
              <TableCell sx={{ fontSize: 16 }}>Số lượng*</TableCell>
              <TableCell align="right">
                <Button
                  onClick={() => handleAdAdd(activeSubCampaignIndex)}
                  variant="outlined"
                  startIcon={<AddIcon />}
                >
                  Thêm
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activeSubCampaign.ads.map((ad: any, adIndex: number) => (
              <TableRow key={adIndex}>
                <TableCell></TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    value={ad.name}
                    margin="dense"
                    fullWidth
                    required
                    onChange={(e) => {
                      const updatedAds = [...activeSubCampaign.ads]
                      updatedAds[adIndex] = { ...ad, name: e.target.value }
                      const updatedSubCampaigns = [...campaign.subCampaigns]
                      updatedSubCampaigns[activeSubCampaignIndex] = {
                        ...activeSubCampaign,
                        ads: updatedAds,
                      }
                      setCampaign({
                        ...campaign,
                        subCampaigns: updatedSubCampaigns,
                      })
                    }}
                    error={submitted && !ad.name}
                    helperText={
                      submitted && !ad.name ? 'Dữ liệu không hợp lệ' : ''
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    type="number"
                    value={ad.quantity}
                    margin="dense"
                    fullWidth
                    required
                    error={
                      submitted && (ad.quantity <= 0 || isNaN(ad.quantity))
                    }
                    helperText={
                      submitted && (ad.quantity <= 0 || isNaN(ad.quantity))
                        ? 'Dữ liệu không hợp lệ'
                        : ''
                    }
                    onChange={(e) => {
                      const quantity = parseFloat(e.target.value)
                      if (!isNaN(quantity)) {
                        const updatedAds = [...activeSubCampaign.ads]
                        updatedAds[adIndex] = { ...ad, quantity: quantity }
                        const updatedSubCampaigns = [...campaign.subCampaigns]
                        updatedSubCampaigns[activeSubCampaignIndex] = {
                          ...activeSubCampaign,
                          ads: updatedAds,
                        }
                        setCampaign({
                          ...campaign,
                          subCampaigns: updatedSubCampaigns,
                        })
                      }
                    }}
                  />
                </TableCell>
                <TableCell width={10} align="right">
                  <IconButton
                    onClick={() =>
                      handleDeleteAd(activeSubCampaignIndex, adIndex)
                    }
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default TableAds
