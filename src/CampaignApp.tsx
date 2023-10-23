import React, { useState } from 'react'
import './Campaign.css'
import {
  Button,
  Tabs,
  Tab,
  TextField,
  Box,
  Divider,
  FormControlLabel,
  Checkbox,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
} from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import AddIcon from '@mui/icons-material/Add'
import TableAds from './TableAds'

export type Campaign = {
  information: {
    name: string
    describe?: string
  }
  subCampaigns: SubCampaign[]
}

export type SubCampaign = {
  name: string
  status: boolean
  ads: Ad[]
}

export type Ad = {
  name: string
  quantity: number
}

const CampaignApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('information')
  const [campaign, setCampaign] = useState<Campaign>({
    information: {
      name: '',
      describe: '',
    },
    subCampaigns: [
      {
        name: 'Chiến dịch con 1',
        status: true,
        ads: [{ name: 'Quảng cáo 1', quantity: 1 }],
      },
    ],
  })

  const [activeSubCampaignIndex, setActiveSubCampaignIndex] = useState(0)
  const activeSubCampaign = campaign.subCampaigns[activeSubCampaignIndex]
  const [submitted, setSubmitted] = useState(false)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const handleSubCampaignAdd = () => {
    const newSubCampaignName = `Chiến dịch con ${
      campaign.subCampaigns.length + 1
    }`
    const newSubCampaign = {
      name: newSubCampaignName,
      status: true,
      ads: [{ name: 'Quảng cáo 1', quantity: 1 }],
    }
    setCampaign({
      ...campaign,
      subCampaigns: [...campaign.subCampaigns, newSubCampaign],
    })

    setActiveSubCampaignIndex(campaign.subCampaigns.length)
  }

  const handleAdAdd = (subCampaignIndex: number) => {
    const updatedSubCampaigns = [...campaign.subCampaigns]
    const newAdName = `Quảng cáo ${
      updatedSubCampaigns[subCampaignIndex].ads.length + 1
    }`
    updatedSubCampaigns[subCampaignIndex].ads.push({
      name: newAdName,
      quantity: 1,
    })
    setCampaign({ ...campaign, subCampaigns: updatedSubCampaigns })
  }

  const handleSubmit = () => {
    setSubmitted(true)
    // Validate
    let isValid = true
    if (!campaign.information.name) {
      isValid = false
    }
    for (let i = 0; i < campaign.subCampaigns.length; i++) {
      if (
        !campaign.subCampaigns[i].name ||
        campaign.subCampaigns[i].ads.length === 0
      ) {
        isValid = false
        campaign.subCampaigns[i].status = true
      }
      for (let j = 0; j < campaign.subCampaigns[i].ads.length; j++) {
        if (
          !campaign.subCampaigns[i].ads[j].name ||
          campaign.subCampaigns[i].ads[j].quantity <= 0
        ) {
          isValid = false
        }
      }
    }
    if (isValid) {
      alert(`Thêm thành công chiến dịch \ncampaign:${JSON.stringify(campaign)}`)
      console.log(campaign)
      // Submit data
    } else {
      alert('Vui lòng điền đúng và đầy đủ thông tin')
      setCampaign({ ...campaign })
    }
  }

  const calculateTotalAdsInSubCampaign = (subCampaign: SubCampaign) => {
    return subCampaign.ads.reduce(
      (total: number, ad: Ad) => total + ad.quantity,
      0
    )
  }

  const handleDeleteAd = (subCampaignIndex: number, adIndex: number) => {
    const updatedSubCampaigns = [...campaign.subCampaigns]
    const ads = [...updatedSubCampaigns[subCampaignIndex].ads]
    ads.splice(adIndex, 1)
    updatedSubCampaigns[subCampaignIndex].ads = ads
    setCampaign({ ...campaign, subCampaigns: updatedSubCampaigns })
  }

  return (
    <div>
      <div
        style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}
      >
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
      <Divider />
      <Box
        m={3}
        p={1}
        style={{
          boxShadow:
            '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
        }}
      >
        <Box
          m={1}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Box>
            <Tabs value={activeTab} onChange={(e, tab) => handleTabChange(tab)}>
              <Tab label="Thông tin" value="information" />
              <Tab label="Chiến dịch con" value="subCampaign" />
            </Tabs>
          </Box>
        </Box>

        <Box m={3}>
          {activeTab === 'information' && (
            <form>
              <TextField
                variant="standard"
                label="Tên chiến dịch"
                value={campaign.information.name}
                onChange={(e) =>
                  setCampaign({
                    ...campaign,
                    information: {
                      ...campaign.information,
                      name: e.target.value,
                    },
                  })
                }
                margin="dense"
                fullWidth
                required
                error={submitted && !campaign.information.name}
                helperText={
                  submitted && !campaign.information.name
                    ? 'Dữ liệu không hợp lệ'
                    : ''
                }
              />
              <TextField
                variant="standard"
                label="Mô tả"
                value={campaign.information.describe}
                onChange={(e) =>
                  setCampaign({
                    ...campaign,
                    information: {
                      ...campaign.information,
                      describe: e.target.value,
                    },
                  })
                }
                margin="dense"
                fullWidth
              />
            </form>
          )}

          {activeTab === 'subCampaign' && (
            <div>
              <div style={{ overflow: 'auto', marginBottom: '30px' }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginBottom: '5px',
                  }}
                >
                  <div>
                    <IconButton
                      onClick={handleSubCampaignAdd}
                      sx={{ backgroundColor: 'rgb(237, 237, 237)' }}
                      color="secondary"
                      aria-label="add-sub-campaign"
                    >
                      <AddIcon />
                    </IconButton>
                  </div>
                  {campaign.subCampaigns.map(
                    (subCampaign, subCampaignIndex) => {
                      return (
                        <Card
                          key={subCampaignIndex}
                          sx={{ minWidth: 230, height: 120, marginLeft: 2 }}
                          className={
                            subCampaignIndex === activeSubCampaignIndex
                              ? 'active-card'
                              : 'sub-card'
                          }
                          onClick={() =>
                            setActiveSubCampaignIndex(subCampaignIndex)
                          }
                        >
                          <CardContent>
                            <Typography
                              variant="h6"
                              component="div"
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                              }}
                            >
                              {subCampaign.name}
                              <CheckCircle
                                color={
                                  subCampaign.status ? 'success' : 'disabled'
                                }
                              />
                            </Typography>
                            <Typography variant="h6" component="div">
                              {calculateTotalAdsInSubCampaign(subCampaign)}
                            </Typography>
                          </CardContent>
                        </Card>
                      )
                    }
                  )}
                </div>
              </div>

              <div>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <TextField
                      variant="standard"
                      label="Tên chiến dịch con"
                      value={activeSubCampaign.name}
                      onChange={(e) => {
                        const updatedSubCampaigns = [...campaign.subCampaigns]
                        updatedSubCampaigns[activeSubCampaignIndex] = {
                          ...activeSubCampaign,
                          name: e.target.value,
                        }
                        setCampaign({
                          ...campaign,
                          subCampaigns: updatedSubCampaigns,
                        })
                      }}
                      margin="dense"
                      fullWidth
                      required
                      error={submitted && !activeSubCampaign.name}
                      helperText={
                        submitted && !activeSubCampaign.name
                          ? 'Dữ liệu không hợp lệ'
                          : ''
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={activeSubCampaign.status}
                          onChange={(e) => {
                            const updatedSubCampaigns = [
                              ...campaign.subCampaigns,
                            ]
                            updatedSubCampaigns[activeSubCampaignIndex] = {
                              ...activeSubCampaign,
                              status: e.target.checked,
                            }
                            setCampaign({
                              ...campaign,
                              subCampaigns: updatedSubCampaigns,
                            })
                          }}
                        />
                      }
                      label="Đang hoạt động"
                    />
                  </Grid>
                </Grid>

                <TableAds
                  submitted={submitted}
                  campaign={campaign}
                  setCampaign={setCampaign}
                  activeSubCampaign={activeSubCampaign}
                  handleAdAdd={handleAdAdd}
                  activeSubCampaignIndex={activeSubCampaignIndex}
                  handleDeleteAd={handleDeleteAd}
                />
              </div>
            </div>
          )}
        </Box>
      </Box>
    </div>
  )
}

export default CampaignApp
