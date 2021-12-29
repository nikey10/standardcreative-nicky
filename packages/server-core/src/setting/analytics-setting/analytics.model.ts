import { DataTypes, Sequelize } from 'sequelize'
import { Application } from '../../../declarations'

export default (app: Application): any => {
  const sequelizeClient: Sequelize = app.get('sequelizeClient')
  const Analytics = sequelizeClient.define('analyticsSetting', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    port: {
      type: DataTypes.STRING,
      allowNull: true
    },
    processInterval: {
      type: DataTypes.STRING,
      allowNull: true
    }
  })
  return Analytics
}
