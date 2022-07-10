// 3 TYPES OF EVENTS IN EVERY APP
            // user input
            // external requests
            // timers

            let context = {} // contains configuration, views etc. (application specific)

            // ROUTES
            // admin
            async function user() {}
            async function type(context, incoming) {
                // create
                // delete
                // cancel
                // update
            }
            async function group() {}
            async function field() {}
            async function script() {}

            // user
            async function item() {}




            // VIEWS (make into a fluent interface)
            let button = {
                create: function (t, c, f) { 
                    let b = document.createElement("button"); 
                    b.textContent = t;
                    b.className = c;
                    b.onmousedown = f;
                    return b;
                }
            }

            let input = {
                create: function (c) { 
                    let b = document.createElement("input"); 
                    b.className = c;
                    return b;
                }
            }

            let panel = {
                create: function (c, e) {
                    let panel = document.createElement("div");
                    panel.className = c;
                    let title = document.createElement("div");
                    title.className = c + "-title";
                    panel.append(title);
                    
                    for (let i = 0; i < e.length; i++) {
                        panel.append(e[i]);
                    }
                    return panel;
                }
            }

            let _delete = { type: "internal", data: "delete" }
            let _create = { type: "internal", data: "create" }
            let _cancel = { type: "internal", data: "cancel" }
            let _update = { type: "internal", data: "update" }

            // Admin
            let admin_types = div();
            let type_setup = div();

            // User
            let user_types = div();
            let type_items = div();
            let item_setup = div(); 
            view.input();
            tp.button("Cancel", "bt-cancel", type(context, _cancel));