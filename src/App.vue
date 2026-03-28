<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import syncedIcon1 from './assets/synced_icon_1.png'
import syncedIcon2 from './assets/synced_icon_2.png'
import activityIcon1 from './assets/activity-1.png'
import activityIcon2 from './assets/activity-2.png'
import activityIcon3 from './assets/activity-3.png'
import activityIcon4 from './assets/activity-4.png'
import lineCurved from './assets/line-curved.png'
import UiButton from './components/ui/UiButton.vue'
import UiToolbarField from './components/ui/UiToolbarField.vue'
import UiSegmentedTabs from './components/ui/UiSegmentedTabs.vue'

const isWorkflowModalOpen = ref(false)
const isLookalikeModalOpen = ref(false)
const showLookalikeList = ref(false)
const selectedLookalikeList = ref('founder')
const selectedWorkflow = ref('advanced')
const selectedImportMethod = ref('')
const addCampaignStep = ref('define-audience')
const isStatsLaunched = ref(false)
const campaignOverviewTab = ref('linkedin')
const senderProfileTab = ref('linkedin')
const isCampaignListLoaded = ref(false)
const aiAutoReply = ref(false)
const aiAutoHandle = ref(false)
const isSidebarOpen = ref(false)
const toggleSidebar = () => { isSidebarOpen.value = !isSidebarOpen.value }
const closeSidebar = () => { isSidebarOpen.value = false }
const crmRows = [
  { synced: true, icon: syncedIcon1, time: '2h ago' },
  { synced: false },
  { synced: false },
  { synced: true, icon: syncedIcon2, time: '1d ago' },
  { synced: true, icon: syncedIcon1, time: '5h ago' },
  { synced: true, icon: syncedIcon1, time: '6h ago' },
  { synced: true, icon: syncedIcon1, time: '6h ago' },
]
const senderProfileTabOptions = [
  { label: 'LinkedIn Profile', value: 'linkedin' },
  { label: 'Email Accounts', value: 'email' },
]
const overviewTabOptions = [
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'Email', value: 'email' },
]
const currentRoute = ref(window.location.pathname === '/add-campaign' ? '/add-campaign' : '/')

const syncRouteFromLocation = () => {
  currentRoute.value = window.location.pathname === '/add-campaign' ? '/add-campaign' : '/'
}

const goToAddCampaign = () => {
  isWorkflowModalOpen.value = false
  currentRoute.value = '/add-campaign'
  selectedImportMethod.value = ''
  addCampaignStep.value = 'define-audience'

  if (window.location.pathname !== '/add-campaign')
    window.history.pushState({}, '', '/add-campaign')
}

const onWorkflowSelect = workflow => {
  selectedWorkflow.value = workflow
  goToAddCampaign()
}

const selectImportMethod = method => {
  selectedImportMethod.value = method

  if (method === 'lookalike') {
    showLookalikeList.value = false
    isLookalikeModalOpen.value = true
  }
}

const closeLookalikeModal = () => {
  isLookalikeModalOpen.value = false
}

const openLookalikeList = () => {
  showLookalikeList.value = true
}

const selectLookalikeList = list => {
  selectedLookalikeList.value = list
}

const goToSenderProfilesStep = () => {
  addCampaignStep.value = 'sender-profiles'
}

const goToDefineAudienceStep = () => {
  addCampaignStep.value = 'define-audience'
}

const goToSettingsStep = () => {
  addCampaignStep.value = 'settings'
}

const goToStatsStep = () => {
  addCampaignStep.value = 'stats'
}

const launchCampaignStats = () => {
  isStatsLaunched.value = true
}

const refreshCampaignList = () => {
  isCampaignListLoaded.value = true
}

onMounted(() => {
  window.addEventListener('popstate', syncRouteFromLocation)
})

onBeforeUnmount(() => {
  window.removeEventListener('popstate', syncRouteFromLocation)
})
</script>

<template>
  <v-app class="campaign-app">
    <div class="layout-shell">
      <aside class="sidebar" :class="{ 'sidebar--open': isSidebarOpen }">
        <div class="brand">
          <img class="brand-logo" src="./assets/logo.png" alt="Logo">
          <svg
            class="brand-helper-icon"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Toggle sidebar"
            role="img"
          >
            <path
              d="M2.25 8.25C2.25 5.42157 2.25 4.00736 3.12868 3.12868C4.00736 2.25 5.42157 2.25 8.25 2.25H9.75C12.5784 2.25 13.9927 2.25 14.8713 3.12868C15.75 4.00736 15.75 5.42157 15.75 8.25V9.75C15.75 12.5784 15.75 13.9927 14.8713 14.8713C13.9927 15.75 12.5784 15.75 9.75 15.75H8.25C5.42157 15.75 4.00736 15.75 3.12868 14.8713C2.25 13.9927 2.25 12.5784 2.25 9.75V8.25Z"
              stroke="#5E5873"
              stroke-width="1.125"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.25 2.25V15.75"
              stroke="#5E5873"
              stroke-width="1.125"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6 6.75L6.83114 7.40901C7.77705 8.15903 8.25 8.53403 8.25 9C8.25 9.46597 7.77705 9.84097 6.83114 10.591L6 11.25"
              stroke="#5E5873"
              stroke-width="1.125"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <button class="menu-item active" type="button">
          <v-icon size="18">mdi-bullhorn-variant-outline</v-icon>
          <span>Campaign</span>
        </button>

        <div class="sidebar-spacer" />

        <div class="profile-card">
          <div class="profile-row">
            <div class="avatar-with-status avatar-with-status-sm">
              <v-avatar size="34">
                <img class="avatar-image" src="./assets/john-doe.png" alt="John Doe">
              </v-avatar>
              <span class="status-dot" />
            </div>
            <div class="profile-meta">
              <div class="profile-name">John Doe</div>
              <div class="profile-role">Admin</div>
            </div>
            <v-btn class="logout-btn" icon variant="text" size="28">
              <v-icon size="18">mdi-logout-variant</v-icon>
            </v-btn>
          </div>
          <div class="profile-email">Email</div>
          <div class="profile-address">johndoe@gmail.com</div>
        </div>

        <div class="theme-toggle">
          <button class="toggle-btn active" type="button">
            <v-icon size="14">mdi-white-balance-sunny</v-icon>
            Light
          </button>
          <button class="toggle-btn" type="button">
            <v-icon size="14">mdi-weather-night</v-icon>
            Dark
          </button>
        </div>
      </aside>

      <div v-if="isSidebarOpen" class="sidebar-backdrop" @click="closeSidebar" />

      <main class="main-panel">
        <header class="top-bar">
          <button class="mobile-menu-btn" type="button" @click="toggleSidebar">
            <v-icon size="22">mdi-menu</v-icon>
          </button>
          <div class="crumbs">
            <v-icon size="16" color="#8f96aa">mdi-home-outline</v-icon>
            <span>Campaign</span>
            <template v-if="currentRoute === '/add-campaign'">
              <v-icon size="14" color="#9aa0b3">mdi-chevron-right</v-icon>
              <span>Advance Campaign</span>
            </template>
          </div>
          <div class="top-profile">
            <div class="top-profile-text">
              <div class="top-profile-name">John Doe</div>
              <div class="top-profile-role">Admin</div>
            </div>
            <div class="avatar-with-status">
              <v-avatar size="34">
                <img class="avatar-image" src="./assets/john-doe.png" alt="John Doe">
              </v-avatar>
              <span class="status-dot" />
            </div>
          </div>
        </header>
        <section class="main-content">
          <template v-if="currentRoute === '/add-campaign'">
            <section class="add-campaign-page">
              <div class="workflow-steps">
                <div class="step-item" :class="{ active: addCampaignStep === 'define-audience', completed: addCampaignStep !== 'define-audience' }">
                  <span class="step-icon"><v-icon size="13">mdi-format-list-bulleted</v-icon></span>
                  <span>Define Target Audience</span>
                </div>
                <v-icon size="16" class="step-arrow">mdi-chevron-right</v-icon>
                <div class="step-item" :class="{ active: addCampaignStep === 'sender-profiles', completed: addCampaignStep === 'settings' || addCampaignStep === 'stats' }">
                  <span class="step-icon"><v-icon size="13">mdi-account-search-outline</v-icon></span>
                  <span>Sender Profiles</span>
                </div>
                <v-icon size="16" class="step-arrow">mdi-chevron-right</v-icon>
                <div class="step-item" :class="{ active: addCampaignStep === 'settings', completed: addCampaignStep === 'stats' }">
                  <span class="step-icon"><v-icon size="13">mdi-cog-outline</v-icon></span>
                  <span>Settings</span>
                </div>
                <v-icon size="16" class="step-arrow">mdi-chevron-right</v-icon>
                <div class="step-item" :class="{ active: addCampaignStep === 'stats' }">
                  <span class="step-icon"><v-icon size="13">mdi-google-analytics</v-icon></span>
                  <span>Stats</span>
                </div>
              </div>

              <template v-if="addCampaignStep === 'define-audience'">
                <div class="campaign-form-block">
                  <div class="timeline-marker" :class="{ completed: !!selectedImportMethod }">
                    <v-icon v-if="selectedImportMethod" size="10">mdi-check</v-icon>
                  </div>
                  <div class="import-method-card">
                    <div class="import-method-title">
                      <span>Choose Import Method</span>
                      <span class="step-count">Step 1 of 2</span>
                      <v-icon size="16" color="#8f96ab">mdi-chevron-up</v-icon>
                    </div>
                    <div class="import-method-options">
                      <button class="import-option" :class="{ selected: selectedImportMethod === 'linkedin' }" type="button" @click="selectImportMethod('linkedin')">
                        <v-icon size="14" color="#4f74ff">mdi-linkedin</v-icon>
                        <h4>LinkedIn Search</h4>
                        <p>(Basic, Sales Nav, Post, Group or Event URL)</p>
                        <div v-if="selectedImportMethod === 'linkedin'" class="import-selected-badge">
                          <v-icon size="12">mdi-check</v-icon>
                        </div>
                      </button>
                      <button class="import-option" :class="{ selected: selectedImportMethod === 'csv' }" type="button" @click="selectImportMethod('csv')">
                        <v-icon size="14" color="#4f74ff">mdi-calendar-month-outline</v-icon>
                        <h4>Upload CSV File</h4>
                        <p>Upload LinkedIn profiles via CSV. <span>Download Sample</span></p>
                        <div v-if="selectedImportMethod === 'csv'" class="import-selected-badge">
                          <v-icon size="12">mdi-check</v-icon>
                        </div>
                      </button>
                      <button class="import-option" :class="{ selected: selectedImportMethod === 'lookalike' }" type="button" @click="selectImportMethod('lookalike')">
                        <v-icon size="14" color="#4f74ff">mdi-account-multiple-plus-outline</v-icon>
                        <h4>Lookalike Audience</h4>
                        <p>Use Lead Finder to find audience.</p>
                        <div v-if="selectedImportMethod === 'lookalike'" class="import-selected-badge">
                          <v-icon size="12">mdi-check</v-icon>
                        </div>
                      </button>
                      <button class="import-option" :class="{ selected: selectedImportMethod === 'webhook' }" type="button" @click="selectImportMethod('webhook')">
                        <v-icon size="14" color="#4f74ff">mdi-link-variant</v-icon>
                        <h4>Inbound Webhook</h4>
                        <p>Sync leads from zapier, n8n make in real time</p>
                        <div v-if="selectedImportMethod === 'webhook'" class="import-selected-badge">
                          <v-icon size="12">mdi-check</v-icon>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                <template v-if="selectedImportMethod === 'linkedin'">
                  <div class="campaign-form-block">
                    <div class="timeline-marker pending" />
                    <div class="import-method-card url-card">
                      <div class="import-method-title">
                        <span>Paste LinkedIn Search URL</span>
                      </div>
                      <div class="url-input-box">
                        <div class="url-hint-row">
                          <v-icon size="14" color="#4f74ff">mdi-linkedin</v-icon>
                          <span>
                            Find your target audience with
                            <a href="#" @click.prevent>LinkedIn Search</a>
                            or
                            <a href="#" @click.prevent>Sales Navigator</a>
                            or
                            <a href="#" @click.prevent>Post URL</a>
                            or
                            <a href="#" @click.prevent>Group URL</a>
                          </span>
                          <a href="#" class="search-guide" @click.prevent>Search Guide</a>
                        </div>
                        <div class="url-input-row">
                          <input type="text" placeholder="https://www.linkedin.com/search/results/people/?keywords=">
                          <UiButton class="validate-btn">Validate</UiButton>
                        </div>
                        <p class="url-footnote">Paste the search URL direcly from Linkedin</p>
                      </div>
                    </div>
                  </div>
                </template>

                <template v-else-if="selectedImportMethod === 'csv'">
                  <div class="campaign-form-block">
                    <div class="timeline-marker pending" />
                    <div class="import-method-card url-card">
                      <div class="import-method-title">
                        <span>Upload CSV File</span>
                        <span class="step-count">Step 1 of 2</span>
                        <v-icon size="16" color="#8f96ab">mdi-chevron-up</v-icon>
                      </div>
                      <div class="csv-upload-wrap">
                        <div class="csv-dropzone">
                          <v-icon size="28" color="#8ba6ff">mdi-tray-arrow-up</v-icon>
                          <p class="csv-dropzone-title">Drag a File or click a <span>browse</span></p>
                          <p class="csv-dropzone-subtitle">File with up to 100 rows works best</p>
                        </div>
                        <button class="sample-download-btn" type="button">
                          <v-icon size="14">mdi-download-circle-outline</v-icon>
                          Download a sample file
                        </button>
                      </div>
                    </div>
                  </div>
                </template>

                <div class="add-campaign-actions">
                  <UiButton @click="goToSenderProfilesStep">
                    Next
                  </UiButton>
                </div>
              </template>

              <template v-else-if="addCampaignStep === 'sender-profiles'">
                <section class="sender-profiles-page">
                  <UiSegmentedTabs v-model="senderProfileTab" :options="senderProfileTabOptions" />

                  <div class="profiles-card">
                    <div class="profiles-card-header">
                      <div>
                        <div class="profiles-title">
                          <v-icon size="18" color="#1e74d8">mdi-linkedin</v-icon>
                          LinkedIn Profile
                        </div>
                        <p class="profiles-subtitle">Pick which LinkedIn profiles you want to use for this campaign.</p>
                      </div>
                      <UiButton class="add-account-btn" icon="mdi-plus">Add Account</UiButton>
                    </div>

                    <div class="profiles-toolbar">
                      <div class="profiles-show">Show <span>10</span> <v-icon size="16">mdi-chevron-down</v-icon></div>
                      <div class="profiles-search"><v-icon size="16">mdi-magnify</v-icon> Search</div>
                    </div>

                    <div class="profiles-table-head">
                      <span><span class="table-checkbox-placeholder" /></span>
                      <span>NAME</span>
                      <span>HEALTH</span>
                      <span>DAILY LIMITS</span>
                      <span>ACCOUNT TYPE</span>
                      <span>STATUS</span>
                    </div>

                    <div class="profiles-row">
                      <span><span class="table-checkbox-placeholder" /></span>
                      <div class="profile-name-cell">
                        <img src="./assets/edgar-jones.png" alt="Edgar Jones">
                        <div>
                          <div class="person-name">Edgar Jones</div>
                          <div class="person-sub">1,250 connections</div>
                        </div>
                      </div>
                      <div class="health-cell">
                        <div class="health-ring" />
                      </div>
                      <div><span class="daily-limit-pill">Invites: 40 / day</span></div>
                      <div class="account-type-cell">
                        <v-icon size="18" color="#f1c40f">mdi-linkedin</v-icon>
                        Premium
                      </div>
                      <div><span class="status-pill">Connected</span></div>
                    </div>
                  </div>
                </section>

                <div class="add-campaign-actions sender-actions">
                  <button class="previous-link" type="button" @click="goToDefineAudienceStep">
                    <v-icon size="14">mdi-undo-variant</v-icon>
                    Previous
                  </button>
                  <UiButton class="submit-btn" @click="goToSettingsStep">Next</UiButton>
                </div>
              </template>

              <template v-else-if="addCampaignStep === 'settings'">
                <section class="settings-page">
                  <div class="settings-card">
                    <label class="settings-label">Campaign name</label>
                    <input class="settings-input" type="text" value="New Outreach Campaign">

                    <h3 class="settings-section-title">Sending Window</h3>
                    <p class="settings-section-subtitle">Define when the campaign runs</p>

                    <div class="settings-grid">
                      <div class="window-card">
                        <div class="window-select-row">
                          <span>USA Outreach Time</span>
                          <v-icon size="18">mdi-chevron-down</v-icon>
                        </div>

                        <div class="days-row">
                          <button class="day-btn active" type="button">MON</button>
                          <button class="day-btn active" type="button">TUE</button>
                          <button class="day-btn active" type="button">WED</button>
                          <button class="day-btn active" type="button">THU</button>
                          <button class="day-btn" type="button">FRI</button>
                          <button class="day-btn active" type="button">SAT</button>
                          <button class="day-btn" type="button">SUN</button>
                          <button class="day-btn icon" type="button"><v-icon size="14">mdi-delete-outline</v-icon></button>
                        </div>

                        <div class="time-row">
                          <div class="time-field"><v-icon size="16">mdi-clock-time-four-outline</v-icon>11:30 AM - 04:00 PM</div>
                          <div class="time-field">USA Timezone</div>
                        </div>

                        <button class="add-window-link" type="button">
                          <v-icon size="18">mdi-plus</v-icon>
                          Add New Window
                        </button>
                      </div>

                      <div class="assist-card">
                        <div class="assist-head">
                          <div class="assist-title">
                            <v-icon size="16" color="#4f74ff">mdi-robot-outline</v-icon>
                            AI Assist <span>Optional</span>
                          </div>
                          <UiButton class="train-ai-btn">Train AI</UiButton>
                        </div>
                        <p class="assist-subtitle">Define when the campaign runs</p>

                        <div class="assist-item">
                          <div>
                            <div class="assist-item-title">Auto message after reply detected</div>
                            <div class="assist-item-text">AI auto-replies to leads who message you back</div>
                          </div>
                          <v-switch
                            v-model="aiAutoReply"
                            class="assist-switch"
                            color="primary"
                            inset
                            hide-details
                          />
                        </div>

                        <div class="assist-item">
                          <div>
                            <div class="assist-item-title">Auto handle leads after <span class="followup-count">2</span> Follow-ups</div>
                            <div class="assist-item-text">AI takes over after two follow-ups.</div>
                          </div>
                          <v-switch
                            v-model="aiAutoHandle"
                            class="assist-switch"
                            color="primary"
                            inset
                            hide-details
                          />
                        </div>
                      </div>
                    </div>

                    <div class="zapier-card">
                      <div class="zapier-head">
                        <v-checkbox-btn model-value />
                        <span>Select events to trigger zapier</span>
                        <v-icon size="14" color="#a2a9bc">mdi-information-outline</v-icon>
                      </div>

                      <div class="zapier-events">
                        <label><v-checkbox-btn model-value />Response received</label>
                        <label><v-checkbox-btn />Invite sent</label>
                        <label><v-checkbox-btn />Invitation accepted</label>
                        <label><v-checkbox-btn />Invitation withdrawn</label>
                        <label><v-checkbox-btn />Followup Sent</label>
                      </div>

                      <div class="works-with">
                        <span class="works-with-label">Works With</span>
                        <img src="./assets/logo-zapier.png" alt="Zapier">
                        <img src="./assets/logo-n8n.png" alt="n8n">
                        <img src="./assets/logo-webhooks.png" alt="Webhooks">
                      </div>
                    </div>

                    <p class="settings-footnote">If a lead answers your invite, message, or InMail, we stop sending further steps automatically. <a href="#" @click.prevent>Learn more</a></p>
                  </div>
                </section>

                <div class="add-campaign-actions sender-actions">
                  <button class="previous-link" type="button" @click="goToSenderProfilesStep">
                    <v-icon size="14">mdi-undo-variant</v-icon>
                    Previous
                  </button>
                  <UiButton class="submit-btn" @click="goToStatsStep">Next</UiButton>
                </div>
              </template>

              <template v-else>
                <section v-if="isStatsLaunched" class="stats-page">
                  <div class="stats-toolbar">
                    <UiToolbarField mode="select" label="All" />
                    <UiToolbarField mode="search" label="Search" />
                  </div>

                  <div class="stats-grid">
                    <div class="stats-main-col">
                      <div class="stats-campaign-card">
                        <div class="stats-campaign-head">
                          <div>
                            <h4>Tech Founder</h4>
                            <div class="chip-row"><span>LinkedIn</span><span>Email</span></div>
                          </div>
                          <div class="campaign-running">Running</div>
                        </div>
                        <div class="campaign-progress">
                          <div class="campaign-progress-bar"><span /></div>
                          <div class="campaign-progress-meta">
                            <span>Created: 8 Jan, 2026 &nbsp; | &nbsp; CRM Connected</span>
                            <strong>74 / 200 prospects processed</strong>
                          </div>
                        </div>
                      </div>

                      <div class="stats-overview-card">
                        <div class="overview-head">
                          <h4>Campaign Overview</h4>
                          <UiSegmentedTabs v-model="campaignOverviewTab" :options="overviewTabOptions" />
                        </div>
                        <div v-if="campaignOverviewTab === 'linkedin'" class="overview-bars">
                          <div class="overview-bar"><label>New Leads</label><b>1,628</b><i style="height: 86px; background:#6c63ff;" /></div>
                          <div class="overview-bar"><label>Invites Sent</label><b>988</b><i style="height: 58px; background:#a9bfd8;" /></div>
                          <div class="overview-bar"><label>Invites Accepted</label><b>507</b><i style="height: 40px; background:#bddbd4;" /></div>
                          <div class="overview-bar"><label>Messages Sent</label><b>460</b><i style="height: 76px; background:#d7e8be;" /></div>
                          <div class="overview-bar"><label>Replies</label><b>202</b><i style="height: 28px; background:#cfe7c8;" /></div>
                        </div>
                        <div v-else class="overview-bars">
                          <div class="overview-bar"><label>New Leads</label><b>1,142</b><i style="height: 72px; background:#6c63ff;" /></div>
                          <div class="overview-bar"><label>Emails Sent</label><b>2,840</b><i style="height: 86px; background:#a9bfd8;" /></div>
                          <div class="overview-bar"><label>Opens</label><b>1,936</b><i style="height: 64px; background:#bddbd4;" /></div>
                          <div class="overview-bar"><label>Clicks</label><b>604</b><i style="height: 42px; background:#d7e8be;" /></div>
                          <div class="overview-bar"><label>Replies</label><b>318</b><i style="height: 32px; background:#cfe7c8;" /></div>
                        </div>
                      </div>

                      <div class="stats-bottom-grid">
                        <div class="campaign-actions-card">
                          <h4>Campaign Actions</h4>
                          <p>Execution stats &amp; engagement signals</p>
                          <div class="actions-cols">
                            <div>
                              <div>Remaining Leads: <b>110</b></div>
                              <div>Follow-up message: <b>10</b></div>
                              <div>InMails Sent: <b>20</b></div>
                              <div>Emails: <b>89</b></div>
                            </div>
                            <div>
                              <div>Profile Viewed: <b>45</b></div>
                              <div>Profile Followed: <b>140</b></div>
                              <div>Skills Endorsed: <b>50</b></div>
                              <div>Comments Added: <b>54</b></div>
                            </div>
                          </div>
                          <div class="actions-team-footer">
                            <span>Team:</span>
                            <div class="team-avatars">
                              <img src="./assets/edgar-jones.png" alt="Team member 1">
                              <img src="./assets/john-doe.png" alt="Team member 2">
                              <img src="./assets/edgar-jones.png" alt="Team member 3">
                            </div>
                          </div>
                        </div>
                        <div class="reply-performance-card">
                          <h4>Reply Performance</h4>
                          <p>Top reply channel</p>
                          <div class="perf-row"><span>Follow-up</span><b>80%</b><i><em style="width:80%;background:#4f74ff;" /></i></div>
                          <div class="perf-row"><span>InMail</span><b>32%</b><i><em style="width:32%;background:#24be7f;" /></i></div>
                          <div class="perf-row"><span>Email</span><b>11%</b><i><em style="width:11%;background:#ea5f6a;" /></i></div>
                          <div class="perf-row"><span>Connection Message</span><b>79%</b><i><em style="width:79%;background:#4f74ff;" /></i></div>
                        </div>
                      </div>
                    </div>

                    <div class="stats-side-col">
                      <div class="reply-analysis-card">
                        <h4>Reply Analysis</h4>
                        <div class="reply-gauge">
                          <svg class="gauge-svg" viewBox="0 0 200 120">
                            <g v-for="tick in 30" :key="tick" :transform="`rotate(${-90 + (tick - 1) * 6}, 100, 100)`">
                              <rect
                                x="98"
                                y="12"
                                width="4"
                                rx="2"
                                :height="14"
                                :fill="tick <= 24 ? '#6366f1' : '#d4d8e8'"
                                :opacity="tick <= 24 ? (0.5 + (tick / 24) * 0.5) : 0.6"
                              />
                            </g>
                            <circle cx="100" cy="100" r="52" fill="none" stroke="#e8ecf3" stroke-width="1" stroke-dasharray="3,4" />
                            <text x="100" y="92" text-anchor="middle" class="gauge-value">80%</text>
                            <text x="100" y="110" text-anchor="middle" class="gauge-label">Discussions</text>
                          </svg>
                        </div>
                        <div class="reply-legend">
                          <div class="reply-legend-head">
                            <span>Status</span>
                            <span>Results</span>
                          </div>
                          <div><i class="p" /> Positive <b>12%</b></div>
                          <div><i class="n" /> Neutral <b>14%</b></div>
                          <div><i class="ng" /> Negative <b>8%</b></div>
                        </div>
                      </div>
                      <div class="recent-activity-card">
                        <h4>Recent Campaign Activity</h4>
                        <div class="activity-timeline">
                          <div class="activity-node">
                            <div class="activity-node-rail">
                              <div class="activity-circle activity-circle--purple">
                                <img :src="activityIcon1" alt="">
                              </div>
                            </div>
                            <div class="activity-body">
                              <span class="activity-time">09:14 AM</span>
                              <div class="activity-title">Campaign started</div>
                              <div class="activity-by">by <a href="#" @click.prevent>Aman S.</a></div>
                            </div>
                          </div>
                          <div class="activity-node">
                            <div class="activity-node-rail">
                              <div class="activity-circle activity-circle--blue">
                                <img :src="activityIcon2" alt="">
                              </div>
                            </div>
                            <div class="activity-body">
                              <span class="activity-time">10:30 AM</span>
                              <div class="activity-title">Reply received</div>
                              <div class="activity-by">from <a href="#" @click.prevent>Suresh K.</a></div>
                            </div>
                          </div>
                          <div class="activity-node">
                            <div class="activity-node-rail">
                              <div class="activity-circle activity-circle--salmon">
                                <img :src="activityIcon3" alt="">
                              </div>
                            </div>
                            <div class="activity-body">
                              <span class="activity-time">10:35 AM</span>
                              <div class="activity-title">Follow-up message sent</div>
                              <div class="activity-by">by <a href="#" @click.prevent>System</a></div>
                            </div>
                          </div>
                          <div class="activity-branch">
                            <img :src="lineCurved" class="branch-curve" alt="">
                            <div class="activity-body">
                              <span class="activity-time">10:35 AM</span>
                              <div class="activity-title">Connection accepted</div>
                              <div class="activity-by">by <a href="#" @click.prevent>Suresh K.</a> (Prospect)</div>
                            </div>
                          </div>
                          <div class="activity-node">
                            <div class="activity-node-rail">
                              <div class="activity-circle activity-circle--orange">
                                <img :src="activityIcon4" alt="">
                              </div>
                            </div>
                            <div class="activity-body">
                              <span class="activity-time">10:45 AM</span>
                              <div class="activity-title">Campaign paused</div>
                              <div class="activity-by">by <a href="#" @click.prevent>Aman S.</a></div>
                            </div>
                          </div>
                          <div class="activity-branch">
                            <img :src="lineCurved" class="branch-curve" alt="">
                            <a class="activity-log-link" href="#" @click.prevent>
                              <v-icon size="16">mdi-open-in-new</v-icon>
                              Open Activity Log
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section v-else class="stats-empty-state">
                  <img class="stats-empty-image" src="./assets/no-campaigns-banner.png" alt="No stats">
                  <h3>No Stats Yet</h3>
                  <p>Once Campaign is launched, Statistics will be shown here.</p>
                  <UiButton class="launch-campaign-btn" icon="mdi-rocket-launch-outline" size="md" @click="launchCampaignStats">
                    Launch Campaign
                  </UiButton>
                </section>
              </template>
            </section>
          </template>

          <template v-else>
            <section class="toolbar">
              <UiToolbarField mode="select" label="All" />
              <UiToolbarField mode="search" label="Search" />
              <UiButton class="refresh-btn" variant="outline" icon="mdi-refresh" @click="refreshCampaignList">
                Refresh
              </UiButton>
            </section>

            <section v-if="!isCampaignListLoaded" class="empty-state">
              <img
                class="empty-image"
                src="./assets/no-campaigns-banner.png"
                alt="No campaigns"
              >
              <UiButton
                class="new-campaign-btn"
                @click="isWorkflowModalOpen = true"
              >
                New Campaign
              </UiButton>
            </section>

            <section v-else class="campaigns-list-page">
              <div class="campaigns-list-head">
                <div>
                  <h3>All Campaigns List</h3>
                  <p>A quick look at all of your outreach initiatives.</p>
                </div>
                <UiButton class="new-campaign-btn" @click="isWorkflowModalOpen = true">New Campaign</UiButton>
              </div>

              <div class="campaign-list-filters">
                <button type="button">Channel <v-icon size="14">mdi-chevron-down</v-icon></button>
                <button type="button">Status <v-icon size="14">mdi-chevron-down</v-icon></button>
                <button type="button">Clear All</button>
                <button type="button" class="export-btn"><v-icon size="14">mdi-export-variant</v-icon> Export List</button>
              </div>

              <div class="campaign-list-table">
                <div class="campaign-list-header">
                  <span />
                  <span>ALL CAMPAIGNS</span>
                  <span>CRM</span>
                  <span>INVITES SENT</span>
                  <span>REPLY RATE</span>
                  <span>EMAIL SENT</span>
                  <span>SENDER</span>
                  <span>STATUS</span>
                  <span>DAILY LIMIT</span>
                </div>

                <div v-for="row in 7" :key="row" class="campaign-list-row">
                  <span><span class="table-checkbox-placeholder" /></span>
                  <div class="campaign-name-col">
                    <strong>{{ row === 2 ? 'Growth Ca...' : row === 3 ? 'Campaign P...' : row === 4 ? 'Lead Engine' : row === 5 ? 'Campaign Hub' : 'Tech Founder' }}</strong>
                    <small>Created On: 21 Jan, 2026</small>
                  </div>
                  <div class="campaign-crm-col">
                    <template v-if="crmRows[row - 1]?.synced">
                      <div class="crm-synced">
                        <div class="crm-synced-top">
                          <img :src="crmRows[row - 1].icon" alt="Synced platform icon">
                          <span>Synced</span>
                        </div>
                        <small>{{ crmRows[row - 1].time }}</small>
                      </div>
                    </template>
                    <template v-else>
                      <span class="crm-sync-btn">Sync to CRM</span>
                    </template>
                  </div>
                  <div class="campaign-metric-col"><b>265</b><small>15% Accepted</small></div>
                  <div class="campaign-metric-col"><b>125</b><small>10% Received</small></div>
                  <div class="campaign-metric-col"><b>400</b><small>10% Mail Opened</small></div>
                  <div class="campaign-sender-col">
                    <img src="./assets/edgar-jones.png" alt="Sender 1">
                    <img src="./assets/john-doe.png" alt="Sender 2">
                  </div>
                  <div><span class="status-pill"><v-icon size="12" class="status-pill-icon">mdi-pause</v-icon> Running</span></div>
                  <div><span class="daily-limit-pill">40 invites/day</span></div>
                </div>
              </div>
            </section>
          </template>
        </section>
      </main>
    </div>

    <v-dialog v-model="isWorkflowModalOpen" max-width="780">
      <div class="workflow-modal">
        <div class="workflow-modal-header">
          <div>
            <h3 class="workflow-modal-title">Select Workflow Mode</h3>
            <p class="workflow-modal-subtitle">Choose how you want your campaign to behave</p>
          </div>
          <v-btn class="workflow-close-icon-btn" icon variant="text" size="24" @click="isWorkflowModalOpen = false">
            <v-icon size="24" color="#64748B">mdi-close-circle-outline</v-icon>
          </v-btn>
        </div>

        <div
          class="workflow-option"
          :class="{ active: selectedWorkflow === 'advanced' }"
          @click="onWorkflowSelect('advanced')"
        >
          <div class="workflow-option-main">
            <div class="workflow-radio" :class="{ active: selectedWorkflow === 'advanced' }" />
            <div>
              <div class="workflow-option-title">
                Advanced Workflow
                <span class="recommended-chip">Recommended</span>
              </div>
              <div class="workflow-option-subtitle">Best for high-volume outreach</div>
              <div class="workflow-option-meta">Conditional logic&nbsp;&nbsp;•&nbsp;&nbsp;Multiple paths&nbsp;&nbsp;•&nbsp;&nbsp;More control</div>
            </div>
          </div>
          <img class="workflow-image" src="./assets/advanced-workflow.png" alt="Advanced Workflow">
        </div>

        <div
          class="workflow-option"
          :class="{ active: selectedWorkflow === 'standard' }"
          @click="onWorkflowSelect('standard')"
        >
          <div class="workflow-option-main">
            <div class="workflow-radio" :class="{ active: selectedWorkflow === 'standard' }" />
            <div>
              <div class="workflow-option-title">Standard Workflow</div>
              <div class="workflow-option-subtitle">Best for beginners</div>
              <div class="workflow-option-meta">Linear steps&nbsp;&nbsp;•&nbsp;&nbsp;No conditions&nbsp;&nbsp;•&nbsp;&nbsp;Easy Setup</div>
            </div>
          </div>
          <img class="workflow-image" src="./assets/standard-workflow.png" alt="Standard Workflow">
        </div>

        <div class="workflow-modal-actions">
          <UiButton class="workflow-close-btn" variant="neutral" @click="isWorkflowModalOpen = false">
            Close
          </UiButton>
          <UiButton @click="goToAddCampaign">
            Next
          </UiButton>
        </div>
      </div>
    </v-dialog>

    <v-dialog v-model="isLookalikeModalOpen" max-width="820">
      <div class="lookalike-modal">
        <div class="lookalike-modal-header">
          <div>
            <h3 class="lookalike-modal-title">Lookalikes</h3>
            <p class="lookalike-modal-subtitle">Select a lookalike list for this campaign</p>
          </div>
          <v-btn class="workflow-close-icon-btn" icon variant="text" size="24" @click="closeLookalikeModal">
            <v-icon size="24" color="#64748B">mdi-close-circle-outline</v-icon>
          </v-btn>
        </div>

        <div v-if="!showLookalikeList" class="lookalike-modal-empty">
          <h4>You don't have any leads</h4>
          <p>Create a lead list to start running campaigns</p>
          <UiButton class="create-list-btn" size="md" @click="openLookalikeList">Create a List</UiButton>
        </div>

        <div v-else class="lookalike-modal-list">
          <button
            class="lookalike-list-item"
            :class="{ selected: selectedLookalikeList === 'founder' }"
            type="button"
            @click="selectLookalikeList('founder')"
          >
            <div class="lookalike-item-main">
              <v-icon size="18" color="#64748B">mdi-format-list-bulleted</v-icon>
              <span class="lookalike-item-name">Founder</span>
              <span class="lookalike-item-meta">(1000+ Users in the List)</span>
            </div>
            <div v-if="selectedLookalikeList === 'founder'" class="lookalike-item-check">
              <v-icon size="12">mdi-check</v-icon>
            </div>
          </button>

          <button
            class="lookalike-list-item"
            :class="{ selected: selectedLookalikeList === 'tech-profiles' }"
            type="button"
            @click="selectLookalikeList('tech-profiles')"
          >
            <div class="lookalike-item-main">
              <v-icon size="18" color="#64748B">mdi-format-list-bulleted</v-icon>
              <span class="lookalike-item-name">Tech Profiles</span>
              <span class="lookalike-item-meta">(1000+ Users in the List)</span>
            </div>
            <div v-if="selectedLookalikeList === 'tech-profiles'" class="lookalike-item-check">
              <v-icon size="12">mdi-check</v-icon>
            </div>
          </button>

          <button class="lookalike-add-new" type="button">Add New</button>

          <div class="lookalike-modal-actions">
            <UiButton class="workflow-close-btn" variant="neutral" @click="closeLookalikeModal">Cancel</UiButton>
            <UiButton @click="closeLookalikeModal">Select List</UiButton>
          </div>
        </div>
      </div>
    </v-dialog>
  </v-app>
</template>

<style scoped>
.campaign-app {
  font-family: Montserrat, sans-serif;
  background: #f5f6f8;
}

.layout-shell {
  display: flex;
  height: 100vh;
  gap: 14px;
  overflow: hidden;
}

.sidebar {
  width: 260px;
  height: 100vh;
  background: #fff;
  border: 1px solid #eceff5;
  border-radius: 6px;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.brand {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 26px;
  line-height: 1;
  font-weight: 700;
  color: #1f2437;
  margin-bottom: 16px;
}

.brand-logo {
  width: 146px;
  height: 26px;
  object-fit: contain;
}

.brand-helper-icon {
  margin-left: auto;
  color: #a8afc0;
}

.menu-item {
  width: 100%;
  border: 1px solid #dce2f0;
  border-radius: 4px;
  height: 32px;
  background: #fff;
  color: #6f7690;
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 10px;
}

.menu-item.active {
  color: #fff;
  background: linear-gradient(90deg, #8ba6ff 0%, #3762ee 89%);
  border-color: transparent;
  box-shadow: none;
}

.sidebar-spacer {
  flex: 1;
}

.profile-card {
  border: 1px solid #edf1f6;
  border-radius: 6px;
  background: #F4F5F8;
  padding: 8px;
}

.profile-row {
  display: flex;
  align-items: center;
  gap: 7px;
}

.profile-meta {
  flex: 1;
}

.profile-name {
  font-size: 12px;
  font-weight: 600;
  color: #2e3449;
  line-height: 1.2;
}

.profile-role {
  font-size: 11px;
  color: #8f96ab;
  line-height: 1.1;
}

.profile-email {
  margin-top: 9px;
  font-size: 10px;
  color: #9ba1b3;
}

.profile-address {
  font-size: 11px;
  color: #2d3347;
}

.theme-toggle {
  margin-top: 8px;
  border: 1px solid #eceff5;
  border-radius: 999px;
  display: flex;
  background: #fff;
  overflow: hidden;
  height: 34px;
}

.toggle-btn {
  width: 50%;
  border: 0;
  background: transparent;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: #7f869d;
  font-size: 11px;
  font-weight: 500;
}

.toggle-btn.active {
  background: #f5f7fb;
  color: #3c4566;
}

.main-panel {
  flex: 1;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 12px;
  overflow-y: auto;
}

.top-bar {
  height: 56px;
  border: 1px solid #edf1f6;
  border-radius: 6px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  box-shadow: 0 6px 16px rgb(17 28 58 / 6%);
}

.crumbs {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #8f96ab;
  font-size: 12px;
}

.top-profile {
  display: flex;
  align-items: center;
  gap: 8px;
}

.top-profile-text {
  text-align: right;
}

.top-profile-name {
  font-size: 12px;
  color: #2b3248;
  font-weight: 600;
  line-height: 1.2;
}

.top-profile-role {
  font-size: 11px;
  color: #9aa0b3;
  line-height: 1.1;
}

.main-content {
  flex: 1;
  border: 1px solid #eceff5;
  border-radius: 6px;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.toolbar {
  display: flex;
  gap: 10px;
  padding: 18px 18px 0;
}

.select-like,
.search-like {
  height: 30px;
  border: 1px solid #e0e4ee;
  border-radius: 4px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  color: #8e95a9;
  font-size: 11px;
}

.select-like {
  width: 136px;
}

.search-like {
  width: 136px;
  justify-content: flex-start;
  gap: 6px;
}

.refresh-btn {
  height: 30px;
  min-width: 90px;
  text-transform: none;
  border-color: #dfe5ef;
  color: #63708f;
  gap: 6px;
}

.empty-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  gap: 20px;
  padding-top: 56px;
}

.campaigns-list-page {
  padding: 6px 18px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.campaigns-list-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.campaigns-list-head h3 {
  font-size: 24px;
  color: #3f465d;
}

.campaigns-list-head p {
  margin-top: 2px;
  font-size: 12px;
  color: #8f96ab;
}

.campaign-list-filters {
  display: flex;
  align-items: center;
  gap: 8px;
}

.campaign-list-filters button {
  height: 34px;
  border: 1px solid #dfe5ef;
  border-radius: 6px;
  background: #fff;
  color: #6f7690;
  white-space: nowrap;
  font-size: 13px;
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.campaign-list-filters .export-btn {
  margin-left: auto;
}

.campaign-list-table {
  border: 1px solid #e4e9f2;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
}

.campaign-list-header {
  height: 36px;
  background: #f4f6fb;
  color: #6f7690;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.3px;
  display: grid;
  grid-template-columns: 34px 1.8fr 0.9fr 0.9fr 0.9fr 0.9fr 0.8fr 0.9fr 1fr;
  align-items: center;
  padding: 0 12px;
}

.campaign-list-row {
  min-height: 66px;
  border-top: 1px solid #edf1f6;
  display: grid;
  grid-template-columns: 34px 1.8fr 0.9fr 0.9fr 0.9fr 0.9fr 0.8fr 0.9fr 1fr;
  align-items: center;
  padding: 8px 12px;
}

.campaign-name-col strong {
  display: block;
  font-size: 14px;
  color: #3f465d;
}

.campaign-name-col small {
  font-size: 12px;
  color: #8f96ab;
}

.campaign-crm-col {
  font-size: 13px;
  color: #4f5772;
  display: flex;
  align-items: center;
  gap: 6px;
}

.campaign-crm-col img {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.crm-synced {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}

.crm-synced-top {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.crm-synced-top span {
  color: #4b526c;
  font-size: 13px;
  font-weight: 600;
}

.crm-synced small {
  color: #8f96ab;
  font-size: 11px;
  line-height: 1;
}

.campaign-crm-col .crm-sync-btn {
  height: 24px;
  border: 1px solid #dfe5ef;
  border-radius: 6px;
  background: #fff;
  padding: 0 8px;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  color: #8a92a8;
  font-size: 11px;
}

.campaign-metric-col b {
  display: block;
  font-size: 20px;
  color: #3f465d;
}

.campaign-metric-col small {
  font-size: 12px;
  color: #8f96ab;
}

.campaign-sender-col {
  display: flex;
  align-items: center;
}

.campaign-sender-col img {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid #fff;
  margin-left: -7px;
}

.campaign-sender-col img:first-child {
  margin-left: 0;
}

.add-campaign-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 12px;
}

.workflow-steps {
  min-height: 44px;
  border: 1px solid #e8ecf3;
  border-radius: 4px;
  background: #fafbfd;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 12px;
}

.step-item {
  height: 32px;
  padding: 0 8px 0 0;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  color: #6f7691;
  display: flex;
  align-items: center;
  gap: 6px;
}

.step-item.active {
  color: #3f465d;
}

.step-icon {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #f1f3f7;
  color: #7a8197;
}

.step-item.active .step-icon {
  background: linear-gradient(90deg, #8ba6ff 0%, #3762ee 89%);
  color: #fff;
}

.step-item.completed .step-icon {
  background: #dbe7ff;
  color: #4f74ff;
}

.step-arrow {
  color: #9ca3b6;
}

.import-method-card {
  flex: 1;
  border: 1px solid #e8ecf3;
  border-radius: 4px;
  background: #fff;
  padding: 0 0 12px;
}

.campaign-form-block {
  position: relative;
  margin-top: 12px;
  padding-left: 24px;
}

.campaign-form-block::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 28px;
  bottom: -14px;
  width: 1px;
  background: #e4e9f2;
}

.campaign-form-block:last-of-type::before {
  bottom: calc(100% - 28px);
}

.timeline-marker {
  position: absolute;
  left: 1px;
  top: 14px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid #4f74ff;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 9px;
}

.timeline-marker.completed {
  border: 0;
  background: #2cc46d;
}

.timeline-marker.pending {
  border-color: #4f74ff;
}

.import-method-title {
  display: flex;
  align-items: center;
  gap: 14px;
  color: #4d546e;
  font-size: 13px;
  font-weight: 600;
  height: 48px;
  padding: 0 14px;
  border-bottom: 1px solid #edf1f6;
}

.import-method-title :deep(.v-icon) {
  margin-left: auto;
}

.step-count {
  font-size: 11px;
  font-weight: 600;
  color: #8f96ab;
}

.import-method-options {
  display: flex;
  gap: 10px;
  padding: 14px 12px 0;
}

.import-option {
  width: 130px;
  min-height: 110px;
  border: 1px solid #e6ebf3;
  border-radius: 6px;
  background: #f6f8fc;
  padding: 10px;
  text-align: left;
  position: relative;
  cursor: pointer;
  transition: border-color 0.15s ease;
}

.import-option.selected {
  border-color: #88a5ff;
  box-shadow: inset 0 0 0 1px rgb(136 165 255 / 35%);
}

.import-selected-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background: #3f6bff;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.url-card {
  flex: 0;
}

.url-input-box {
  margin: 12px;
  border: 1px solid #e6ebf3;
  border-radius: 6px;
  background: #fff;
  padding: 14px;
}

.url-hint-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #4e556d;
  flex-wrap: wrap;
}

.url-hint-row a {
  color: #3f6bff;
  text-decoration: none;
}

.search-guide {
  margin-left: auto;
  font-size: 12px;
}

.url-input-row {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.url-input-row input {
  flex: 1;
  height: 38px;
  border: 1px solid #e2e7f0;
  border-radius: 6px;
  outline: none;
  padding: 0 12px;
  color: #59607a;
  font-size: 13px;
}

.url-input-row input::placeholder {
  color: #a2a9bc;
}

.validate-btn {
  min-width: 100px;
  text-transform: none;
  border-radius: 6px;
  color: #fff;
  background: linear-gradient(90deg, #8ba6ff 0%, #3762ee 89%);
}

.url-footnote {
  margin-top: 10px;
  font-size: 12px;
  color: #8f96ab;
}

.csv-upload-wrap {
  padding: 12px;
}

.csv-dropzone {
  min-height: 170px;
  border: 2px dashed #b9c9ec;
  border-radius: 10px;
  background: #f8faff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.csv-dropzone-title {
  margin-top: 10px;
  color: #5c6380;
  font-size: 14px;
  font-weight: 500;
}

.csv-dropzone-title span {
  color: #3f6bff;
}

.csv-dropzone-subtitle {
  margin-top: 3px;
  font-size: 13px;
  color: #8f96ab;
}

.sample-download-btn {
  margin-top: 10px;
  border: 0;
  background: transparent;
  color: #5f6b8c;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.import-option h4 {
  margin-top: 8px;
  font-size: 12px;
  color: #3f465d;
  line-height: 1.25;
}

.import-option p {
  margin-top: 6px;
  font-size: 10px;
  color: #8d94a8;
  line-height: 1.3;
}

.import-option p span {
  color: #3f6bff;
}

.add-campaign-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}

.sender-profiles-page {
  margin-top: 12px;
}

.sender-tabs {
  display: inline-flex;
  border: 1px solid #86a5f4;
  border-radius: 8px;
  overflow: hidden;
}

.sender-tab {
  border: 0;
  background: #fff;
  color: #67708b;
  font-size: 13px;
  font-weight: 600;
  padding: 7px 18px;
}

.sender-tab.active {
  background: #edf3ff;
  color: #3f6bff;
}

.profiles-card {
  margin-top: 18px;
  border: 1px solid #e3e8f2;
  border-radius: 10px;
  background: #fff;
  overflow: hidden;
}

.profiles-card-header {
  min-height: 72px;
  padding: 12px 18px;
  border-bottom: 1px solid #edf1f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profiles-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  font-weight: 600;
  color: #4a5068;
}

.profiles-subtitle {
  margin-top: 4px;
  font-size: 13px;
  color: #7f879d;
}

.add-account-btn {
  min-width: 118px;
  height: 32px;
  border-radius: 7px;
  color: #fff;
  text-transform: none;
  background: linear-gradient(90deg, #8ba6ff 0%, #3762ee 89%);
}

.profiles-toolbar {
  padding: 12px 18px;
  border-bottom: 1px solid #edf1f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profiles-show {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #6e7690;
}

.profiles-show span {
  margin-left: 14px;
}

.profiles-search {
  width: 158px;
  height: 34px;
  border: 1px solid #dfe5ef;
  border-radius: 6px;
  color: #8f96ab;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 10px;
}

.profiles-table-head {
  height: 34px;
  background: #f4f6fb;
  color: #6f7690;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.4px;
  display: grid;
  grid-template-columns: 34px 2fr 1.2fr 1.8fr 1.5fr 1fr;
  align-items: center;
  padding: 0 12px;
}

.profiles-row {
  min-height: 58px;
  display: grid;
  grid-template-columns: 34px 2fr 1.2fr 1.8fr 1.5fr 1fr;
  align-items: center;
  padding: 0 12px;
  border-top: 1px solid #edf1f6;
}

.table-checkbox-placeholder {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 1px solid #d4dbe8;
  border-radius: 4px;
  background: #fff;
}

.profile-name-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.profile-name-cell img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.person-name {
  font-size: 14px;
  font-weight: 600;
  color: #3f465d;
}

.person-sub {
  margin-top: 1px;
  font-size: 12px;
  color: #8f96ab;
}

.health-ring {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: conic-gradient(#f3a84b 0 72%, #edf1f7 72% 100%);
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.health-ring::before {
  content: '72';
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #636b83;
  font-size: 13px;
  font-weight: 700;
}

.daily-limit-pill {
  display: inline-flex;
  height: 32px;
  align-items: center;
  border-radius: 6px;
  border: 1px solid #dfe5ef;
  padding: 0 12px;
  font-size: 13px;
  color: #4f5772;
  white-space: nowrap;
}

.account-type-cell {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #727a93;
  font-size: 13px;
}

.status-pill {
  display: inline-flex;
  height: 26px;
  border-radius: 6px;
  padding: 0 12px;
  align-items: center;
  gap: 4px;
  background: #e5f8ee;
  white-space: nowrap;
  color: #2e9e6a;
  font-size: 12px;
  font-weight: 600;
}

.sender-actions {
  margin-top: auto;
  align-items: center;
  gap: 16px;
}

.previous-link {
  border: 0;
  background: transparent;
  color: #6f88ca;
  font-size: 13px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.submit-btn {
  min-width: 90px;
}

.settings-page {
  margin-top: 12px;
}

.settings-card {
  border: 1px solid #e3e8f2;
  border-radius: 8px;
  background: #fff;
  padding: 14px;
}

.settings-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #4a5068;
  margin-bottom: 8px;
}

.settings-input {
  width: 100%;
  height: 36px;
  border: 1px solid #7d9bdd;
  border-radius: 6px;
  padding: 0 12px;
  font-size: 13px;
  color: #5a617b;
}

.settings-section-title {
  margin-top: 18px;
  font-size: 15px;
  font-weight: 600;
  color: #4a5068;
}

.settings-section-subtitle {
  margin-top: 2px;
  font-size: 13px;
  color: #8b92a7;
}

.settings-grid {
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 14px;
}

.window-card,
.assist-card {
  border: 1px solid #e4e9f2;
  border-radius: 10px;
  background: #fff;
}

.window-card {
  padding: 14px;
}

.window-select-row {
  height: 44px;
  border: 1px solid #dfe5ef;
  border-radius: 6px;
  padding: 0 12px;
  color: #5c6380;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.days-row {
  margin-top: 10px;
  display: flex;
  gap: 6px;
}

.day-btn {
  border: 1px solid #dbe1ec;
  border-radius: 6px;
  background: #fff;
  color: #a0a7ba;
  min-width: 52px;
  height: 32px;
  font-size: 12px;
  font-weight: 600;
}

.day-btn.active {
  border-color: #7f9df0;
  color: #4f74ff;
  background: #edf3ff;
}

.day-btn.icon {
  min-width: 34px;
}

.time-row {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr 0.95fr;
  gap: 10px;
}

.time-field {
  height: 36px;
  border: 1px solid #dfe5ef;
  border-radius: 6px;
  padding: 0 10px;
  color: #59607a;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.add-window-link {
  margin-top: 26px;
  border: 0;
  background: transparent;
  color: #4f74ff;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.assist-head {
  min-height: 56px;
  padding: 10px 14px;
  border-bottom: 1px solid #eef1f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.assist-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  font-weight: 600;
  color: #4a5068;
}

.assist-title span {
  font-size: 12px;
  color: #9aa0b4;
  font-weight: 500;
}

.assist-subtitle {
  margin: 8px 14px 0;
  font-size: 13px;
  color: #8b92a7;
}

.train-ai-btn {
  min-width: 94px;
  height: 32px;
  border-radius: 7px;
  color: #fff;
  text-transform: none;
  background: linear-gradient(90deg, #8ba6ff 0%, #3762ee 89%);
}

.assist-item {
  margin-top: 10px;
  padding: 10px 14px;
  border-top: 1px solid #eef1f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.assist-item-title {
  font-size: 14px;
  font-weight: 600;
  color: #4a5068;
}

.assist-item-text {
  margin-top: 4px;
  font-size: 13px;
  color: #8b92a7;
}

.assist-switch {
  margin-inline-start: 10px;
  flex: 0 0 auto;
}

:deep(.assist-switch .v-selection-control) {
  min-height: 24px;
}

:deep(.assist-switch .v-switch__track) {
  height: 24px;
  min-width: 40px;
  border-radius: 999px;
  opacity: 1;
  background: #d3d5da;
}

:deep(.assist-switch .v-switch__thumb) {
  width: 18px;
  height: 18px;
}

.followup-count {
  display: inline-flex;
  min-width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid #d7dce7;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: #5d6480;
  margin: 0 3px;
}

.zapier-card {
  margin-top: 14px;
  border: 1px solid #e3e8f2;
  border-radius: 6px;
  overflow: hidden;
}

.zapier-head {
  height: 50px;
  background: #f4f6fb;
  border-bottom: 1px solid #e8edf5;
  padding: 0 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #4d546d;
  font-weight: 600;
}

.zapier-events {
  height: 68px;
  border-bottom: 1px solid #e8edf5;
  display: flex;
  align-items: center;
  gap: 22px;
  padding: 0 12px;
}

.zapier-events label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #5d6480;
  font-weight: 500;
}

.works-with {
  height: 54px;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0 14px;
  color: #8e95a9;
  font-size: 12px;
}

.works-with-label {
  color: #8e95a9;
}

.works-with img {
  height: 15px;
  width: auto;
  object-fit: contain;
}

.settings-footnote {
  margin-top: 14px;
  color: #7f879d;
  font-size: 12px;
}

.settings-footnote a {
  color: #3f6bff;
  text-decoration: none;
}

.stats-page {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stats-toolbar {
  display: flex;
  gap: 12px;
}

.stats-toolbar :deep(.ui-toolbar-field) {
  width: 174px;
  height: 36px;
  font-size: 12px;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 12px;
}

.stats-main-col {
  display: grid;
  gap: 12px;
}

.stats-campaign-card,
.stats-overview-card,
.campaign-actions-card,
.reply-performance-card,
.reply-analysis-card,
.recent-activity-card {
  border: 1px solid #e4e9f2;
  border-radius: 8px;
  background: #fff;
}

.stats-campaign-card {
  padding: 12px;
}

.stats-campaign-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.stats-campaign-head h4 {
  font-size: 15px;
  color: #3f465d;
}

.chip-row {
  margin-top: 6px;
  display: flex;
  gap: 6px;
}

.chip-row span {
  border: 1px solid #dfe5ef;
  border-radius: 4px;
  padding: 2px 8px;
  font-size: 12px;
  color: #68718d;
}

.overview-tabs button {
  border: 0;
  border-right: 1px solid #dfe5ef;
  padding: 2px 10px;
  font-size: 12px;
  color: #68718d;
  background: #fff;
  min-width: 64px;
}

.overview-tabs button.active {
  background: #eef3ff;
  color: #3f6bff;
}

.overview-tabs button:last-child {
  border-right: 0;
}

.overview-tabs {
  gap: 0;
  border: 1px solid #dfe5ef;
  border-radius: 6px;
  overflow: hidden;
}

.campaign-running {
  border-radius: 6px;
  padding: 5px 10px;
  font-size: 13px;
  color: #2aa46b;
  background: #e5f8ee;
  white-space: nowrap;
  font-weight: 600;
}

.campaign-progress {
  margin-top: 10px;
  border: 1px solid #edf1f6;
  border-radius: 6px;
  padding: 8px;
  background: #f8faff;
}

.campaign-progress-bar {
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: #eceff7;
}

.campaign-progress-bar span {
  display: block;
  height: 100%;
  width: 38%;
  border-radius: 999px;
  background: linear-gradient(90deg, #8ba6ff 0%, #3762ee 89%);
}

.campaign-progress-meta {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #6f7690;
}

.campaign-progress-meta strong {
  color: #4b526c;
}

.stats-overview-card {
  padding: 12px;
}

.overview-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.overview-head h4 {
  font-size: 15px;
  color: #3f465d;
}

.overview-bars {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}

.overview-bar {
  border-right: 1px solid #edf1f6;
  padding-right: 8px;
}

.overview-bar:last-child {
  border-right: 0;
}

.overview-bar label {
  display: block;
  font-size: 12px;
  color: #6f7690;
}

.overview-bar b {
  display: block;
  margin-top: 2px;
  font-size: 24px;
  color: #3f465d;
}

.overview-bar i {
  display: block;
  margin-top: 8px;
  border-radius: 6px 6px 0 0;
}

.stats-bottom-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 12px;
}

.campaign-actions-card,
.reply-performance-card {
  padding: 12px;
}

.campaign-actions-card {
  padding: 12px 12px 0;
  overflow: hidden;
}

.campaign-actions-card h4,
.reply-performance-card h4,
.reply-analysis-card h4,
.recent-activity-card h4 {
  font-size: 15px;
  color: #3f465d;
}

.campaign-actions-card p,
.reply-performance-card p {
  margin-top: 4px;
  font-size: 12px;
  color: #8f96ab;
}

.actions-cols {
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.actions-cols div > div {
  font-size: 13px;
  color: #4f5772;
  margin-bottom: 8px;
}

.actions-cols b {
  float: right;
}

.actions-team-footer {
  margin-top: 8px;
  margin-left: -12px;
  margin-right: -12px;
  height: 52px;
  background: #e7ecf8;
  border-top: 1px solid #dfe6f4;
  padding: 0 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.actions-team-footer span {
  font-size: 13px;
  font-weight: 700;
  color: #4d546d;
}

.team-avatars {
  display: flex;
  align-items: center;
}

.team-avatars img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #fff;
  object-fit: cover;
  margin-left: -8px;
}

.team-avatars img:first-child {
  margin-left: 0;
}

.perf-row {
  margin-top: 10px;
  font-size: 13px;
  color: #4f5772;
}

.perf-row b {
  float: right;
  color: #6f88ca;
}

.perf-row i {
  display: block;
  margin-top: 5px;
  height: 10px;
  border-radius: 999px;
  background: #eceff7;
  overflow: hidden;
}

.perf-row em {
  display: block;
  height: 100%;
  border-radius: 999px;
}

.stats-side-col {
  display: grid;
  gap: 12px;
}

.reply-analysis-card,
.recent-activity-card {
  padding: 12px;
}

.reply-gauge {
  margin-top: 4px;
  text-align: center;
  padding: 0 0 10px;
  border-bottom: 1px solid #edf1f6;
}

.gauge-svg {
  width: 100%;
  max-width: 210px;
  height: auto;
}

.gauge-value {
  font-family: Montserrat, sans-serif;
  font-size: 28px;
  font-weight: 700;
  fill: #3f465d;
}

.gauge-label {
  font-family: Montserrat, sans-serif;
  font-size: 11px;
  fill: #8f96ab;
}

.reply-legend {
  margin-top: 10px;
  font-size: 14px;
  color: #4f5772;
}

.reply-legend-head {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 700;
  color: #3f465d;
  margin-bottom: 10px;
  padding-bottom: 6px;
  border-bottom: 1px solid #edf1f6;
}

.reply-legend div {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.reply-legend b {
  margin-left: auto;
  font-weight: 700;
  color: #3f465d;
}

.reply-legend i {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.reply-legend .p { background: #6f63ff; }
.reply-legend .n { background: #f2aa38; }
.reply-legend .ng { background: #ef5a67; }

/* ── Activity Timeline ── */
.activity-timeline {
  position: relative;
  margin-top: 16px;
}

/* Single straight vertical line connecting all 4 circles */
.activity-timeline::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 21px;
  bottom: 6px;
  width: 2px;
  background: #BDBDBD;
  z-index: 0;
}

/* Node: a circle sitting on the main line + text body */
.activity-node {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding-bottom: 10px;
  position: relative;
}

.activity-node-rail {
  width: 42px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
}

.activity-circle {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.activity-circle img {
  width: 18px;
  height: 18px;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

.activity-circle--purple { background: #7c6cf0; }
.activity-circle--blue   { background: #6b8cfa; }
.activity-circle--orange { background: #f5a623; }
.activity-circle--salmon { background: #ff7769; }

/* Branch: curves off the main line using line-curved.png */
.activity-branch {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding-left: 21px;
  padding-bottom: 6px;
  position: relative;
}

.branch-curve {
  width: 20px;
  height: 22px;
  flex-shrink: 0;
  margin-top: 2px;
}

.activity-body {
  min-width: 0;
}

.activity-time {
  font-size: 11px;
  color: #8f96ab;
  line-height: 1;
}

.activity-title {
  margin-top: 2px;
  font-size: 14px;
  font-weight: 600;
  color: #3f465d;
  line-height: 1.3;
  white-space: nowrap;
}

.activity-by {
  margin-top: 1px;
  font-size: 13px;
  color: #6f7690;
  white-space: nowrap;
}

.activity-by a {
  color: #4a5c8a;
  font-weight: 600;
  text-decoration: none;
}

.activity-log-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #4f74ff;
  text-decoration: none;
  white-space: nowrap;
  padding-top: 4px;
}

.stats-empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.stats-empty-image {
  width: 170px;
  opacity: 0.6;
}

.stats-empty-state h3 {
  margin-top: 18px;
  font-size: 42px;
  color: #555b77;
}

.stats-empty-state p {
  margin-top: 8px;
  font-size: 13px;
  color: #8c93a8;
}

.launch-campaign-btn {
  margin-top: 18px;
  min-width: 170px;
  height: 38px;
  border-radius: 8px;
  text-transform: none;
  color: #fff;
  background: linear-gradient(90deg, #8ba6ff 0%, #3762ee 89%);
}

.empty-image {
  width: min(300px, 58%);
  object-fit: contain;
}

.new-campaign-btn {
  text-transform: none;
  font-weight: 500;
  font-size: 11px;
  min-width: 118px;
  height: 26px;
  border-radius: 6px !important;
  letter-spacing: 0;
  box-shadow: 0 8px 14px rgb(95 114 255 / 24%);
  background: linear-gradient(90deg, #8ba6ff 0%, #3762ee 89%) !important;
  color: #fff !important;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-with-status {
  position: relative;
  width: 34px;
  height: 34px;
  flex: 0 0 34px;
}

.avatar-with-status-sm {
  width: 34px;
  height: 34px;
}

.status-dot {
  position: absolute;
  right: -2px;
  bottom: -1px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 2px solid #fff;
  background: #2eca6a;
}

.logout-btn {
  color: #7f869d;
  backgorund: #E1E7F1;
}

:deep(.logout-btn.v-btn) {
  width: 24px;
  height: 24px;
  min-width: 24px;
  border: 1px solid #dbe0ec;
  border-radius: 4px;
  background: #f7f9fc;
}

:deep(.v-overlay__scrim) {
  background: rgb(40 49 74 / 28%);
}

.workflow-modal {
  border: 1px solid #e9edf4;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 20px 40px rgb(29 42 74 / 22%);
  padding: 20px 22px 16px;
}

.workflow-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: -20px -22px 14px;
  padding: 14px 22px 10px;
  background: #f8f8f8;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border-bottom: 1px solid #eceff5;
}

.workflow-modal-title {
  font-size: 22px;
  line-height: 1.2;
  color: #2f3550;
  margin-bottom: 4px;
}

.workflow-modal-subtitle {
  font-size: 13px;
  color: #8c93a8;
}

.workflow-option {
  border: 1px solid #eceff5;
  border-radius: 8px;
  background: #fff;
  min-height: 122px;
  padding: 18px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.workflow-option + .workflow-option {
  margin-top: 14px;
}

.workflow-option.active {
  background: #f4f8ff;
  border-color: #d8e4ff;
}

.workflow-option-main {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.workflow-radio {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid #c9cfdd;
  margin-top: 3px;
  background: #fff;
}

.workflow-radio.active {
  border: 4px solid #5e87ff;
}

.workflow-option-title {
  color: #2e3449;
  font-size: 17px;
  font-weight: 600;
  line-height: 1.2;
  display: flex;
  gap: 8px;
  align-items: center;
}

.recommended-chip {
  border-radius: 10px;
  padding: 3px 8px;
  background: #dff8e9;
  color: #31b66b;
  font-size: 11px;
  white-space: nowrap;
  font-weight: 600;
}

.workflow-option-subtitle {
  margin-top: 5px;
  color: #7f879d;
  font-size: 13px;
}

.workflow-option-meta {
  margin-top: 10px;
  color: #9ca3b8;
  font-size: 12px;
}

.workflow-image {
  width: 70px;
  height: 70px;
  object-fit: contain;
  margin-left: 14px;
}

.workflow-modal-actions {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

:deep(.workflow-close-icon-btn.v-btn) {
  width: 24px;
  height: 24px;
  min-width: 24px;
  color: #64748b;
}

.workflow-close-btn {
  min-width: 70px;
  text-transform: none;
  color: #8c93a8;
  background: #f2f3f7;
}

.workflow-next-btn {
  min-width: 72px;
  text-transform: none;
  color: #fff;
  background: linear-gradient(90deg, #8ba6ff 0%, #3762ee 89%);
}

.lookalike-modal {
  border-radius: 14px;
  background: #fff;
  overflow: hidden;
}

.lookalike-modal-header {
  padding: 14px 22px 10px;
  background: #f8f8f8;
  border-bottom: 1px solid #eceff5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.lookalike-modal-title {
  font-size: 22px;
  font-weight: 600;
  line-height: 1.2;
  color: #2f3550;
}

.lookalike-modal-subtitle {
  margin-top: 4px;
  font-size: 13px;
  color: #8c93a8;
}

.lookalike-modal-empty {
  min-height: 430px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.lookalike-modal-empty h4 {
  font-size: 24px;
  line-height: 1.2;
  color: #535877;
}

.lookalike-modal-empty p {
  margin-top: 10px;
  font-size: 13px;
  color: #6f7691;
}

.create-list-btn {
  margin-top: 20px;
  min-width: 130px;
  height: 42px;
  text-transform: none;
  color: #fff;
  background: linear-gradient(90deg, #8ba6ff 0%, #3762ee 89%);
}

.lookalike-modal-list {
  padding: 16px 16px 14px;
}

.lookalike-list-item {
  width: 100%;
  height: 50px;
  border: 1px solid #d9e1f2;
  border-radius: 6px;
  background: #f8faff;
  padding: 0 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
}

.lookalike-list-item + .lookalike-list-item {
  margin-top: 10px;
}

.lookalike-list-item.selected {
  border-color: #99b2ff;
}

.lookalike-item-main {
  display: flex;
  align-items: center;
  gap: 8px;
}

.lookalike-item-name {
  font-size: 16px;
  font-weight: 600;
  color: #3f465d;
}

.lookalike-item-meta {
  font-size: 13px;
  color: #6e7690;
}

.lookalike-item-check {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background: #3f6bff;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lookalike-add-new {
  margin-top: 10px;
  margin-left: auto;
  display: block;
  border: 0;
  background: transparent;
  color: #4f74ff;
  font-size: 14px;
}

.lookalike-modal-actions {
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid #eceff5;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

/* ── Mobile hamburger: hidden on desktop ── */
.mobile-menu-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 0;
  background: transparent;
  color: #5e6278;
  border-radius: 6px;
  flex-shrink: 0;
}

.sidebar-backdrop {
  display: none;
}

/* ===================================================================
   RESPONSIVE — Tablet (≤ 1024px)
   Sidebar shrinks, two-column grids stack, tables scroll horizontally
   =================================================================== */
@media (max-width: 1024px) {
  .sidebar {
    width: 220px;
  }

  .settings-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .stats-side-col {
    grid-template-columns: 1fr 1fr;
  }

  .stats-bottom-grid {
    grid-template-columns: 1fr;
  }

  .campaign-list-table {
    overflow-x: auto;
  }

  .campaign-list-header,
  .campaign-list-row {
    min-width: 920px;
  }

  .profiles-card {
    overflow-x: auto;
  }

  .profiles-table-head,
  .profiles-row {
    min-width: 680px;
  }

  .workflow-steps {
    flex-wrap: wrap;
    min-height: auto;
    padding: 8px 10px;
  }
}

/* ===================================================================
   RESPONSIVE — Mobile (< 768px)
   Sidebar becomes off-canvas drawer, grids stack to single column,
   stepper arrows hidden, import cards wrap 2-up, modals go near-full
   =================================================================== */
@media (max-width: 767px) {
  .layout-shell {
    flex-direction: column;
    gap: 0;
  }

  /* Off-canvas sidebar drawer */
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    width: 260px;
    height: 100vh;
    height: 100dvh;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    border-radius: 0;
    box-shadow: none;
  }

  .sidebar--open {
    transform: translateX(0);
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
  }

  .sidebar-backdrop {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 99;
    background: rgba(0, 0, 0, 0.4);
  }

  .mobile-menu-btn {
    display: flex;
  }

  /* Main panel: fill remaining space, prevent horizontal overflow */
  .main-panel {
    flex: 1;
    padding: 8px;
    gap: 8px;
    min-width: 0;
    overflow-x: hidden;
  }

  /* Top bar: shrink height, hide profile name */
  .top-bar {
    height: auto;
    min-height: 48px;
    padding: 8px 12px;
    gap: 8px;
  }

  .top-profile-text {
    display: none;
  }

  .crumbs {
    font-size: 11px;
    gap: 4px;
  }

  /* Main content: allow children to define scroll behavior */
  .main-content {
    min-width: 0;
  }

  /* Toolbar: wrap on small screens */
  .toolbar {
    padding: 12px 12px 0;
    flex-wrap: wrap;
    gap: 8px;
  }

  /* Empty state: reduce top padding */
  .empty-state {
    padding-top: 32px;
    gap: 16px;
  }

  /* Campaign list page */
  .campaigns-list-page {
    padding: 6px 10px 10px;
  }

  .campaigns-list-head {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .campaigns-list-head h3 {
    font-size: 20px;
  }

  .campaign-list-filters {
    flex-wrap: wrap;
    gap: 6px;
  }

  .campaign-list-filters .export-btn {
    margin-left: 0;
  }

  /* Add-campaign stepper: wrap items, hide chevron arrows */
  .add-campaign-page {
    padding: 8px;
  }

  .workflow-steps {
    gap: 4px 6px;
  }

  .step-arrow {
    display: none;
  }

  .step-item {
    font-size: 11px;
    height: 28px;
    padding: 0 6px 0 0;
    gap: 4px;
  }

  .step-icon {
    width: 28px;
    height: 28px;
  }

  /* Import method cards: 2-column wrap */
  .import-method-options {
    flex-wrap: wrap;
  }

  .import-option {
    width: calc(50% - 5px);
    min-width: 0;
  }

  /* URL input: stack vertically */
  .url-hint-row {
    font-size: 12px;
  }

  .search-guide {
    width: 100%;
    margin-left: 0;
    margin-top: 4px;
  }

  .url-input-row {
    flex-direction: column;
  }

  /* Sender profiles: stack header, table scrolls from tablet rule */
  .profiles-card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    min-height: auto;
  }

  /* Settings: stack grids, wrap day buttons */
  .days-row {
    flex-wrap: wrap;
  }

  .day-btn {
    min-width: 44px;
    height: 40px;
  }

  .time-row {
    grid-template-columns: 1fr;
  }

  .assist-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .assist-switch {
    margin-inline-start: 0 !important;
  }

  .zapier-events {
    flex-wrap: wrap;
    height: auto;
    padding: 10px 12px;
    gap: 8px;
  }

  /* Stats: all grids stack to 1 column */
  .stats-toolbar {
    flex-wrap: wrap;
  }

  .stats-toolbar :deep(.ui-toolbar-field) {
    width: auto;
    flex: 1;
    min-width: 120px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .stats-bottom-grid {
    grid-template-columns: 1fr;
  }

  .stats-side-col {
    grid-template-columns: 1fr;
  }

  .overview-bars {
    grid-template-columns: repeat(3, 1fr);
  }

  .overview-bar b {
    font-size: 18px;
  }

  .campaign-progress-meta {
    flex-direction: column;
    gap: 4px;
  }

  .actions-cols {
    grid-template-columns: 1fr;
  }

  /* Stats empty state */
  .stats-empty-state h3 {
    font-size: 28px;
  }

  /* Sender action bar: allow wrapping */
  .sender-actions {
    flex-wrap: wrap;
    gap: 10px;
  }

  /* Modals: tighter padding, stacked workflow images */
  .workflow-modal {
    padding: 14px 16px 12px;
  }

  .workflow-modal-header {
    margin: -14px -16px 12px;
    padding: 12px 16px 8px;
  }

  .workflow-modal-title {
    font-size: 18px;
  }

  .workflow-option {
    flex-direction: column;
    align-items: flex-start;
    padding: 12px;
    min-height: auto;
  }

  .workflow-image {
    margin-left: 0;
    margin-top: 10px;
    align-self: center;
  }

  .lookalike-modal-empty {
    min-height: 300px;
  }

  .lookalike-modal-empty h4 {
    font-size: 20px;
  }

  .lookalike-item-main {
    flex-wrap: wrap;
    gap: 4px;
  }

  .lookalike-item-name {
    font-size: 14px;
  }

  .lookalike-item-meta {
    font-size: 12px;
  }
}

/* ===================================================================
   RESPONSIVE — Small Mobile (< 480px)
   Import cards go full-width, overview bars 2-col, stepper icon-only
   =================================================================== */
@media (max-width: 479px) {
  .import-option {
    width: 100%;
  }

  .overview-bars {
    grid-template-columns: repeat(2, 1fr);
  }

  .workflow-option-title {
    flex-wrap: wrap;
    font-size: 15px;
  }

  .workflow-option-meta {
    font-size: 11px;
  }

  /* Stepper: hide text labels, show only icons */
  .step-item span:not(.step-icon) {
    display: none;
  }
}
</style>
