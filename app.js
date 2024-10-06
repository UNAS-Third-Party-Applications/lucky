/**
 * Lucky App
 * Defined an App to manage lucky
 */
var LuckyApp = LuckyApp || {} //Define lucky App namespace.
/**
 * Constructor UNAS App
 */
LuckyApp.App = function () {
  this.id = 'Lucky'
  this.name = 'Lucky'
  this.version = '6.0.1'
  this.active = false
  this.menuIcon = '/apps/lucky/images/logo.png?v=6.0.1&'
  this.shortcutIcon = '/apps/lucky/images/logo.png?v=6.0.1&'
  this.entryUrl = '/apps/lucky/index.html?v=6.0.1&'
  var self = this
  this.LuckyAppWindow = function () {
    if (UNAS.CheckAppState('Lucky')) {
      return false
    }
    self.window = new MUI.Window({
      id: 'LuckyAppWindow',
      title: UNAS._('Lucky'),
      icon: '/apps/lucky/images/logo_small.png?v=6.0.1&',
      loadMethod: 'xhr',
      width: 750,
      height: 480,
      maximizable: false,
      resizable: true,
      scrollbars: false,
      resizeLimit: { x: [200, 2000], y: [150, 1500] },
      contentURL: '/apps/lucky/index.html?v=6.0.1&',
      require: { css: ['/apps/lucky/css/index.css'] },
      onBeforeBuild: function () {
        UNAS.SetAppOpenedWindow('Lucky', 'LuckyAppWindow')
      },
    })
  }
  this.LuckyUninstall = function () {
    UNAS.RemoveDesktopShortcut('Lucky')
    UNAS.RemoveMenu('Lucky')
    UNAS.RemoveAppFromGroups('Lucky', 'ControlPanel')
    UNAS.RemoveAppFromApps('Lucky')
  }
  new UNAS.Menu(
    'UNAS_App_Internet_Menu',
    this.name,
    this.menuIcon,
    'Lucky',
    '',
    this.LuckyAppWindow
  )
  new UNAS.RegisterToAppGroup(
    this.name,
    'ControlPanel',
    {
      Type: 'Internet',
      Location: 1,
      Icon: this.shortcutIcon,
      Url: this.entryUrl,
    },
    {}
  )
  var OnChangeLanguage = function (e) {
    UNAS.SetMenuTitle('Lucky', UNAS._('Lucky')) //translate menu
    //UNAS.SetShortcutTitle('Lucky', UNAS._('Lucky'));
    if (typeof self.window !== 'undefined') {
      UNAS.SetWindowTitle('LuckyAppWindow', UNAS._('Lucky'))
    }
  }
  UNAS.LoadTranslation(
    '/apps/lucky/languages/Translation?v=' + this.version,
    OnChangeLanguage
  )
  UNAS.Event.addEvent('ChangeLanguage', OnChangeLanguage)
  UNAS.CreateApp(
    this.name,
    this.shortcutIcon,
    this.LuckyAppWindow,
    this.LuckyUninstall
  )
}

new LuckyApp.App()
