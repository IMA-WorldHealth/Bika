define("bika/TabManager/AddTabManager", ["dijit/layout/TabContainer", "dijit/layout/ContentPane", "dojo/_base/declare"],
    function (TabContainer, ContentPane, declare) {
        return declare("AddTabManager", TabContainer, {
//open a new tab
            openTab: function (title, href, closable) {
                var add = true, openTab = true, tabPane = this.getChildren(), i, tbcon = this, pane, valeurChoix;
                for (i = 0; i < tabPane.length; i += 1) {
                    if (title === tabPane[i].params.title) {
                        add = false;
                        break;
                    }
                    openTab = false;
                }
                if (add) {
                    pane = new ContentPane({
                        title: title,
                        href: href,
                        closable: closable,
                        onClose: function () {
                            valeurChoix = true;
                            if (valeurChoix) {
                                if (tbcon.getChildren().length === 2) {
                                    tbcon.getChildren()[1].set('closable', false);
                                    tbcon.getChildren()[0].set('closable', false);
                                }
                                if (tbcon.getChildren().length >= 2) {
                                    tbcon.getChildren()[0].set("closable", true);
                                }
                                return valeurChoix;
                            }
                        }
                    });
                    if (openTab) {
                        this.addChild(pane);
                    }
                    if (openTab === false) {
                        for (i = 0; i < tbcon.getChildren().length; i += 1) {
                            if (this.selectedChildWidget === tabPane[i]) {
                                this.removeChild(tabPane[i]);
                                this.addChild(pane, i);
                                this.selectChild(pane);
                            }
                        }
                    }
                    if (tbcon.getChildren().length === 1) {
                        tbcon.getChildren()[0].set('closable', false);
                    } else {
                        tbcon.getChildren()[0].set('closable', true);
                    }
                } else {
                    for (i = 0; i < tabPane.length; i += 1) {
                        if (title === tabPane[i].params.title) {
                            if (!tabPane[i].selected) {
                                this.selectChild(tabPane[i]);
                            }
                            break;
                        }
                    }
                }
            },
//create a new tab
            newTab: function (title, href, closable) {
                var add = true, newTab = true, tabPane = this.getChildren(), i, tbcon = this, pane, valeurChoix;
                for (i = 0; i < tabPane.length; i += 1) {
                    if (title === tabPane[i].params.title) {
                        add = false;
                        break;
                    }
                }
                if (add) {
                    pane = new ContentPane({
                        title: title,
                        href: href,
                        closable: closable,
                        onClose: function () {
                            valeurChoix = true;
                            if (valeurChoix) {
                                if (tbcon.getChildren().length === 2) {
                                    tbcon.getChildren()[1].set('closable', false);
                                    tbcon.getChildren()[0].set("closable", false);
                                }
                                return valeurChoix;
                            }
                        } // Fin de la fonction onClose
                    });
                    if (newTab) {
                        this.addChild(pane);
                    }
                    if (newTab === false) {
                        this.removeChild(tabPane[0]);
                        this.addChild(pane, 0);
                    }
                    if (tbcon.getChildren().length === 1) {
                        tbcon.getChildren()[0].set('closable', false);
                    } else {
                        tbcon.getChildren()[0].set('closable', true);
                    }
                    this.selectChild(pane);
                } else {
                    for (i  = 0; i < tabPane.length; i += 1) {
                        if (title === tabPane[i].params.title) {
                            if (!tabPane[i].selected) {
                                this.selectChild(tabPane[i]);
                            }
                            break;
                        }
                    }
                }
            },
            constructor: function (args) {
                dojo.safeMixin (this.args);
            }
        });
    });