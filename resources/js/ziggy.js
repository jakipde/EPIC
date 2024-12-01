const Ziggy = {"url":"http:\/\/localhost","port":null,"defaults":{},"routes":{"telescope":{"uri":"telescope\/{view?}","methods":["GET","HEAD"],"wheres":{"view":"(.*)"},"parameters":["view"]},"api.select.table":{"uri":"api\/_default\/select\/{table}","methods":["GET","HEAD"],"parameters":["table"]},"api.file.store":{"uri":"api\/_default\/files","methods":["POST"]},"api.categories.fields":{"uri":"data-entries\/categories\/{category}\/fields","methods":["GET","HEAD"],"parameters":["category"]},"api.customers.index":{"uri":"customers","methods":["GET","HEAD"]},"api.technicians.index":{"uri":"technicians","methods":["GET","HEAD"]},"register":{"uri":"register","methods":["GET","HEAD"]},"login":{"uri":"login","methods":["GET","HEAD"]},"password.request":{"uri":"forgot-password","methods":["GET","HEAD"]},"password.email":{"uri":"forgot-password","methods":["POST"]},"password.reset":{"uri":"reset-password\/{token}","methods":["GET","HEAD"],"parameters":["token"]},"password.store":{"uri":"reset-password","methods":["POST"]},"verification.notice":{"uri":"verify-email","methods":["GET","HEAD"]},"verification.verify":{"uri":"verify-email\/{id}\/{hash}","methods":["GET","HEAD"],"parameters":["id","hash"]},"verification.send":{"uri":"email\/verification-notification","methods":["POST"]},"password.confirm":{"uri":"confirm-password","methods":["GET","HEAD"]},"password.update":{"uri":"password","methods":["PUT"]},"logout":{"uri":"logout","methods":["POST"]},"file.show":{"uri":"files\/{file}","methods":["GET","HEAD"],"parameters":["file"]},"dashboard":{"uri":"dashboard","methods":["GET","HEAD"]},"maintance":{"uri":"maintance","methods":["GET","HEAD"]},"user.index":{"uri":"users","methods":["GET","HEAD"]},"user.store":{"uri":"users","methods":["POST"]},"user.update":{"uri":"users\/{user}","methods":["PUT"],"parameters":["user"],"bindings":{"user":"id"}},"user.destroy":{"uri":"users\/{user}","methods":["DELETE"],"parameters":["user"],"bindings":{"user":"id"}},"permissions.destroy":{"uri":"_permissions\/{permission}","methods":["DELETE"],"parameters":["permission"],"bindings":{"permission":"id"}},"permissions.update":{"uri":"_permissions\/{permission}","methods":["PUT"],"parameters":["permission"],"bindings":{"permission":"id"}},"permissions.store":{"uri":"_permissions","methods":["POST"]},"permissions.index":{"uri":"_permissions","methods":["GET","HEAD"]},"roles.index":{"uri":"roles","methods":["GET","HEAD"]},"roles.create":{"uri":"roles\/create","methods":["GET","HEAD"]},"roles.store":{"uri":"roles","methods":["POST"]},"roles.show":{"uri":"roles\/{role}","methods":["GET","HEAD"],"parameters":["role"]},"roles.edit":{"uri":"roles\/{role}\/edit","methods":["GET","HEAD"],"parameters":["role"],"bindings":{"role":"id"}},"roles.update":{"uri":"roles\/{role}","methods":["PUT","PATCH"],"parameters":["role"],"bindings":{"role":"id"}},"roles.destroy":{"uri":"roles\/{role}","methods":["DELETE"],"parameters":["role"],"bindings":{"role":"id"}},"setting.index":{"uri":"settings","methods":["GET","HEAD"]},"setting.update":{"uri":"settings","methods":["POST"]},"profile.edit":{"uri":"profile","methods":["GET","HEAD"]},"profile.update":{"uri":"profile","methods":["PATCH"]},"profile.destroy":{"uri":"profile","methods":["DELETE"]},"repairs.index":{"uri":"repairs","methods":["GET","HEAD"]},"repairs.create":{"uri":"repairs\/create","methods":["GET","HEAD"]},"repairs.store":{"uri":"repairs","methods":["POST"]},"repairs.show":{"uri":"repairs\/{id}","methods":["GET","HEAD"],"parameters":["id"]},"repairs.edit":{"uri":"repairs\/{repair}\/edit","methods":["GET","HEAD"],"parameters":["repair"]},"repairs.update":{"uri":"repairs\/{repair}","methods":["PUT","PATCH"],"parameters":["repair"]},"repairs.destroy":{"uri":"repairs\/{repair}","methods":["DELETE"],"parameters":["repair"]},"repairs.dashboard":{"uri":"repairs\/dashboard","methods":["GET","HEAD"]},"repairs.overview":{"uri":"repairs\/overview","methods":["GET","HEAD"]},"devices.index":{"uri":"devices","methods":["GET","HEAD"]},"devices.create":{"uri":"devices\/create","methods":["GET","HEAD"]},"devices.store":{"uri":"devices","methods":["POST"]},"devices.show":{"uri":"devices\/{device}","methods":["GET","HEAD"],"parameters":["device"]},"devices.edit":{"uri":"devices\/{device}\/edit","methods":["GET","HEAD"],"parameters":["device"]},"devices.update":{"uri":"devices\/{device}","methods":["PUT","PATCH"],"parameters":["device"]},"devices.destroy":{"uri":"devices\/{device}","methods":["DELETE"],"parameters":["device"]},"devices.dashboard":{"uri":"devices\/dashboard","methods":["GET","HEAD"]},"devices.overview":{"uri":"devices\/overview","methods":["GET","HEAD"]},"accessories.index":{"uri":"accessories","methods":["GET","HEAD"]},"accessories.create":{"uri":"accessories\/create","methods":["GET","HEAD"]},"accessories.store":{"uri":"accessories","methods":["POST"]},"accessories.show":{"uri":"accessories\/{accessory}","methods":["GET","HEAD"],"parameters":["accessory"]},"accessories.edit":{"uri":"accessories\/{accessory}\/edit","methods":["GET","HEAD"],"parameters":["accessory"]},"accessories.update":{"uri":"accessories\/{accessory}","methods":["PUT","PATCH"],"parameters":["accessory"]},"accessories.destroy":{"uri":"accessories\/{accessory}","methods":["DELETE"],"parameters":["accessory"]},"accessories.dashboard":{"uri":"accessories\/dashboard","methods":["GET","HEAD"]},"accessories.overview":{"uri":"accessories\/overview","methods":["GET","HEAD"]},"spare_parts.index":{"uri":"spare_parts","methods":["GET","HEAD"]},"spare_parts.create":{"uri":"spare_parts\/create","methods":["GET","HEAD"]},"spare_parts.store":{"uri":"spare_parts","methods":["POST"]},"spare_parts.show":{"uri":"spare_parts\/{spare_part}","methods":["GET","HEAD"],"parameters":["spare_part"]},"spare_parts.edit":{"uri":"spare_parts\/{spare_part}\/edit","methods":["GET","HEAD"],"parameters":["spare_part"]},"spare_parts.update":{"uri":"spare_parts\/{spare_part}","methods":["PUT","PATCH"],"parameters":["spare_part"]},"spare_parts.destroy":{"uri":"spare_parts\/{spare_part}","methods":["DELETE"],"parameters":["spare_part"]},"spare-parts.dashboard":{"uri":"spare-parts\/dashboard","methods":["GET","HEAD"]},"spare-parts.overview":{"uri":"spare-parts\/overview","methods":["GET","HEAD"]},"tools.index":{"uri":"tools","methods":["GET","HEAD"]},"tools.create":{"uri":"tools\/create","methods":["GET","HEAD"]},"tools.store":{"uri":"tools","methods":["POST"]},"tools.show":{"uri":"tools\/{tool}","methods":["GET","HEAD"],"parameters":["tool"]},"tools.edit":{"uri":"tools\/{tool}\/edit","methods":["GET","HEAD"],"parameters":["tool"]},"tools.update":{"uri":"tools\/{tool}","methods":["PUT","PATCH"],"parameters":["tool"]},"tools.destroy":{"uri":"tools\/{tool}","methods":["DELETE"],"parameters":["tool"]},"tools.dashboard":{"uri":"tools\/dashboard","methods":["GET","HEAD"]},"tools.overview":{"uri":"tools\/overview","methods":["GET","HEAD"]},"products.dashboard":{"uri":"products\/dashboard","methods":["GET","HEAD"]},"products.overview":{"uri":"products\/overview","methods":["GET","HEAD"]},"data-entries.data-input":{"uri":"data-input","methods":["GET","HEAD"]},"data-entries.bulk-input":{"uri":"data-entries\/bulk-input","methods":["GET","HEAD"]},"data-entries.store":{"uri":"data-entries","methods":["POST"]},"data-entries.update":{"uri":"data-entries\/{id}","methods":["PUT"],"parameters":["id"]},"data-entries.destroy":{"uri":"data-entries\/{id}","methods":["DELETE"],"parameters":["id"]},"test-modal-pages.destroy":{"uri":"test-modal-pages\/{testModalPage}","methods":["DELETE"],"parameters":["testModalPage"],"bindings":{"testModalPage":"id"}},"test-modal-pages.update":{"uri":"test-modal-pages\/{testModalPage}","methods":["PUT"],"parameters":["testModalPage"],"bindings":{"testModalPage":"id"}},"test-modal-pages.store":{"uri":"test-modal-pages","methods":["POST"]},"test-modal-pages.index":{"uri":"test-modal-pages","methods":["GET","HEAD"]},"shortlink.link.index":{"uri":"shortlink\/links","methods":["GET","HEAD"]},"shortlink.link.store":{"uri":"shortlink\/links","methods":["POST"]},"shortlink.link.show":{"uri":"shortlink\/links\/{link}","methods":["GET","HEAD"],"parameters":["link"],"bindings":{"link":"id"}},"shortlink.link.update":{"uri":"shortlink\/links\/{link}","methods":["PUT"],"parameters":["link"],"bindings":{"link":"id"}},"shortlink.link.destroy":{"uri":"shortlink\/links\/{link}","methods":["DELETE"],"parameters":["link"],"bindings":{"link":"id"}},"shortlink.home":{"uri":"shortlink","methods":["GET","HEAD"]},"shortlink.":{"uri":"shortlink","methods":["POST"]},"shortlink.redirect":{"uri":"shortlink\/{link}","methods":["GET","HEAD"],"parameters":["link"],"bindings":{"link":"code"}},"custom-form.public":{"uri":"custom-form\/public\/{form}","methods":["GET","HEAD"],"parameters":["form"],"bindings":{"form":"id"}},"custom-form.":{"uri":"custom-form\/public\/{form}","methods":["POST"],"parameters":["form"],"bindings":{"form":"id"}},"custom-form.form-records.print":{"uri":"custom-form\/{form}\/form-records\/print","methods":["GET","HEAD"],"parameters":["form"],"bindings":{"form":"id"}},"custom-form.form-records.export":{"uri":"custom-form\/{form}\/form-records\/export","methods":["GET","HEAD"],"parameters":["form"],"bindings":{"form":"id"}},"custom-form.form-records.index":{"uri":"custom-form\/{form}\/form-records","methods":["GET","HEAD"],"parameters":["form"],"bindings":{"form":"id"}},"custom-form.form-records.create":{"uri":"custom-form\/{form}\/form-records\/create","methods":["GET","HEAD"],"parameters":["form"],"bindings":{"form":"id"}},"custom-form.form-records.store":{"uri":"custom-form\/{form}\/form-records","methods":["POST"],"parameters":["form"],"bindings":{"form":"id"}},"custom-form.form-records.show":{"uri":"custom-form\/{form}\/form-records\/{formRecord}","methods":["GET","HEAD"],"parameters":["form","formRecord"]},"custom-form.form-records.edit":{"uri":"custom-form\/{form}\/form-records\/{formRecord}\/edit","methods":["GET","HEAD"],"parameters":["form","formRecord"],"bindings":{"form":"id","formRecord":"id"}},"custom-form.form-records.update":{"uri":"custom-form\/{form}\/form-records\/{formRecord}","methods":["PUT","PATCH"],"parameters":["form","formRecord"],"bindings":{"form":"id","formRecord":"id"}},"custom-form.form-records.destroy":{"uri":"custom-form\/{form}\/form-records\/{formRecord}","methods":["DELETE"],"parameters":["form","formRecord"],"bindings":{"form":"id","formRecord":"id"}},"custom-form.forms.index":{"uri":"custom-form\/forms","methods":["GET","HEAD"]},"custom-form.forms.create":{"uri":"custom-form\/forms\/create","methods":["GET","HEAD"]},"custom-form.forms.store":{"uri":"custom-form\/forms","methods":["POST"]},"custom-form.forms.show":{"uri":"custom-form\/forms\/{form}","methods":["GET","HEAD"],"parameters":["form"]},"custom-form.forms.edit":{"uri":"custom-form\/forms\/{form}\/edit","methods":["GET","HEAD"],"parameters":["form"],"bindings":{"form":"id"}},"custom-form.forms.update":{"uri":"custom-form\/forms\/{form}","methods":["PUT","PATCH"],"parameters":["form"],"bindings":{"form":"id"}},"custom-form.forms.destroy":{"uri":"custom-form\/forms\/{form}","methods":["DELETE"],"parameters":["form"],"bindings":{"form":"id"}},"storage.local":{"uri":"storage\/{path}","methods":["GET","HEAD"],"wheres":{"path":".*"},"parameters":["path"]}}};

if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}

export { Ziggy };
