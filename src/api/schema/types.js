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

  const Mute = new GraphQLObjectType({
    name: 'mute',
    description: 'mute',
    fields() {
      return {
        id: {
          type: GraphQLID,
          description: 'Mute ID',
          resolve(mute) {
            return mute.id;
          },
        },
        player: {
          type: Player,
          description: 'Muted player',
          resolve(mute) {
            return db.models.player.findById(mute.uuid);
          },
        },
        active: {
          type: GraphQLBoolean,
          description: 'Is the mute active?',
          resolve(mute) {
            return mute.muteState;
          },
        },
        reason: {
          type: GraphQLString,
          description: 'Mute reason',
          resolve(mute) {
            return mute.muteReason;
          },
        },
        staff: {
          type: GraphQLString,
          description: 'Name of staff member who issued the mute',
          resolve(mute) {
            return mute.muteStaff;
          },
        },
        server: {
          type: GraphQLString,
          description: 'Scope of the mute',
          resolve(mute) {
            return mute.muteServer;
          },
        },
        begin: {
          type: GraphQLString,
          description: 'Timestamp of mute creation',
          resolve(mute) {
            return mute.muteBegin;
          },
        },
        end: {
          type: GraphQLString,
          description: 'Timestamp of mute expire',
          resolve(mute) {
            return mute.muteEnd;
          },
        },
        unmuteDate: {
          type: GraphQLString,
          description: 'Timestamp of unmute',
          resolve(mute) {
            return mute.muteUnmuteDate;
          },
        },
        unmuteStaff: {
          type: GraphQLString,
          description: 'Name of staff member who issued the unmute',
          resolve(mute) {
            return mute.muteUnmuteStaff;
          },
        },
        unmuteReason: {
          type: GraphQLString,
          description: 'Reason of unmute',
          resolve(mute) {
            return mute.muteUnmuteReason;
          },
        },
        // TODO: nest mute data in object
      };
    },
  });

  const Kick = new GraphQLObjectType({
    name: 'kick',
    description: 'kick',
    fields() {
      return {
        id: {
          type: GraphQLID,
          description: 'Kick ID',
          resolve(kick) {
            return kick.id;
          },
        },
        player: {
          type: Player,
          description: 'Kicked player',
          resolve(kick) {
            return db.models.player.findById(kick.uuid);
          },
        },
        reason: {
          type: GraphQLString,
          description: 'Kick reason',
          resolve(kick) {
            return kick.kickReason;
          },
        },
        staff: {
          type: GraphQLString,
          description: 'Name of staff member who issued the kick',
          resolve(kick) {
            return kick.kickStaff;
          },
        },
        server: {
          type: GraphQLString,
          description: 'Scope of the kick',
          resolve(kick) {
            return kick.kickServer;
          },
        },
        date: {
          type: GraphQLString,
          description: 'Timestamp of kick',
          resolve(kick) {
            return kick.kickDate;
          },
        },
        // TODO: nest kick data in object
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
        mutes: {
          type: new GraphQLList(Mute),
          description: 'List of player mutes',
          resolve(player) {
            return db.models.mute.findAll({ where: { uuid: player.uuid } });
          },
        },
        kicks: {
          type: new GraphQLList(Kick),
          description: 'List of player kicks',
          resolve(player) {
            return db.models.kick.findAll({ where: { uuid: player.uuid } });
          },
        },
      };
    },
  });

  return { Ban, Player, Mute, Kick };
};
