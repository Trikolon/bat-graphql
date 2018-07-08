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
          description: 'Ban ID',
          resolve(ban) {
            return ban.id;
          },
        },
        player: {
          type: Player,
          description: 'Banned player',
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
          description: 'Ban reason',
          resolve(ban) {
            return ban.banReason;
          },
        },
        staff: {
          type: GraphQLString,
          description: 'Name of staff member who issued the ban',
          resolve(ban) {
            return ban.banStaff;
          },
        },
        server: {
          type: GraphQLString,
          description: 'Scope of the ban',
          resolve(ban) {
            return ban.banServer;
          },
        },
        begin: {
          type: GraphQLString,
          description: 'Timestamp of ban creation',
          resolve(ban) {
            return ban.banBegin;
          },
        },
        end: {
          type: GraphQLString,
          description: 'Timestamp of ban expire',
          resolve(ban) {
            return ban.banEnd;
          },
        },
        unbanDate: {
          type: GraphQLString,
          description: 'Timestamp of unban',
          resolve(ban) {
            return ban.banUnbanDate;
          },
        },
        unbanStaff: {
          type: GraphQLString,
          description: 'Name of staff member who issued the unban',
          resolve(ban) {
            return ban.banUnbanStaff;
          },
        },
        unbanReason: {
          type: GraphQLString,
          description: 'Reason of unban',
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
          description: 'Player unique identifier',
          resolve(player) {
            return player.uuid;
          },
        },
        name: {
          type: GraphQLString,
          description: 'Player nickname',
          resolve(player) {
            return player.name;
          },
        },
        lastLogin: {
          type: GraphQLString,
          description: 'Timestamp of last login',
          resolve(player) {
            return player.lastLogin;
          },
        },
        firstLogin: {
          type: GraphQLString,
          description: 'Timestamp of first ever login',
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
