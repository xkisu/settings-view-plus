/** @babel */

const serviceConfigPanelProvider = require('./settings-view-service-config-panel')

// TODO: provie a way to track which package added which panel
export default class SettingsViewService {
  constructor (){
    this.panels = []
    this.settingsView = undefined
  }

  /**
   * Add all the registered panels to the specified settings-view
  */
  setSettingsView (settingsView) {
    this.settingsView = settingsView

    if (this.panels.length > 0) {
      for (let panel in this.panels) {
        this.addPanelToSettingsView(panel)
      }
    }
  }

  addPanelToSettingsView (panel) {
    console.log(`Adding panel "${panel.panelName}" to the current settings-view`)
    this.settingsView.addCorePanel(panel.panelName, panel.panelIcon, () => new panel())
  }

  addPanel (name, icon, panel) {

  }

  /**
   * Creates a settings tab for the settings in an Atom config namespace.
   *
   * The setting title is either taken from the 'title' property for each config setting, or it's an un-camelcased version in the config setting key.
   * The setting description is taken from the 'description' property of the config setting.
  */
  addConfigNamespacePanel (options) { // name, icon, namespace) {
    const panel = serviceConfigPanelProvider(options) // name, icon, namespace)
    panel.panelName = options.name
    panel.panelIcon = options.icon
    this.panels.push(panel)
    console.log(`added config panel "${options.name}" for namespace "${options.namespace}"`)

    if (this.settingsView) {
      this.addPanelToSettingsView(panel)
    }
  }
}
