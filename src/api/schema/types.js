/* eslint-disable no-use-before-define */ // FIXME
import {
  GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLBoolean,
} from 'graphql';

export default (db) => {
  const Ban = new GraphQLObjectType({
    name: 'ban',
    description: 'ban',
    fields() {
      return {
        id: {
          type: GraphQLID,
          description: 'ban ID',
          resolve(ban) {
            return ban.id;
          },
        },
        player: {
          type: Player,
          description: 'banned player',
          resolve(ban) {
            return db.models.player.findById(ban.uuid);
          },
        },
        active: {
          type: GraphQLBoolean,
          description: 'Is the ban active?',
          resolve(ban) {
            return ban.banState;
          },
        },
        reason: {
          type: GraphQLString,
          description: 'ban reason',
          resolve(ban) {
            return ban.banReason;
          },
        },
        staff: {
          type: GraphQLString,
          description: 'staff member who issued the ban',
          resolve(ban) {
            return ban.banStaff;
          },
        },
        server: {
          type: GraphQLString,
          description: 'scope of the ban',
          resolve(ban) {
            return ban.banServer;
          },
        },
        begin: {
          type: GraphQLString,
          resolve(ban) {
            return ban.banBegin;
          },
        },
        end: {
          type: GraphQLString,
          resolve(ban) {
            return ban.banEnd;
          },
        },
        unbanDate: {
          type: GraphQLString,
          resolve(ban) {
            return ban.banUnbanDate;
          },
        },
        unbanStaff: {
          type: GraphQLString,
          resolve(ban) {
            return ban.banUnbanStaff;
          },
        },
        unbanReason: {
          type: GraphQLString,
          resolve(ban) {
            return ban.banUnbanReason;
          },
        },
        // TODO: nest unban data in object
      };
    },
  });

  const Player = new GraphQLObjectType({
    name: 'player',
    description: 'player',
    fields() {
      return {
        uuid: {
          type: GraphQLString,
          description: 'player unique identifier',
          resolve(player) {
            return player.uuid;
          },
        },
        name: {
          type: GraphQLString,
          description: 'player nickname',
          resolve(player) {
            return player.name;
          },
        },
        lastLogin: {
          type: GraphQLString,
          description: 'timestamp of last login',
          resolve(player) {
            return player.lastLogin;
          },
        },
        firstLogin: {
          type: GraphQLString,
          description: 'timestamp of first ever login',
          resolve(player) {
            return player.firstLogin;
          },
        },
        bans: {
          type: new GraphQLList(Ban),
          description: 'List of player bans',
          resolve(player) {
            return db.models.ban.findAll({ where: { uuid: player.uuid } });
          },
        },
      };
    },
  });

  return { Ban, Player };
};
