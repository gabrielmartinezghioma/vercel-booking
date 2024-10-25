npx sq-exp-cli  <name_project>

GENERACION DEL MODELO 

npx sequelize model:generate --name image --attributes url:string

npx sequelize db:migrate  -> para correr para adelante

npx sequelize db:migrate:undo -> para correr para atras


crear una migracion 
npx sequelize migration:generate --name <adding-brand-column>
npx sequelize migration:generate --name <rename-name-duration>
<!--  -->:

npx sequelize-cli seed:generate --name create-users


