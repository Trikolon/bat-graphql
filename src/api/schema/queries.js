/* eslint-disable no-param-reassign */
import {
  GraphQLBoolean,
  GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString,
} from 'graphql';

import types from './types';


export default (db) => {
  const Types = types(db);
  return {
    players: {
      type: new GraphQLList(Types.Player),
      args: {
        name: {
          type: GraphQLString,
        },
        uuid: {
          type: GraphQLString,
        },
        limit: {
          type: GraphQLInt,
          description: 'Limits the number of results returned in the page. Defaults to 10.',
          defaultValue: 10,
        },
        offset: {
          type: GraphQLInt,
        },
        // TODO: alias should be the same as in types. How to filter by attributes?
        // TODO: Date range filter
      },
      resolve(root, args) {
        const { offset, limit } = args;
        delete args.offset;
        delete args.limit;
        delete args.desc;
        return db.models.player.findAll({
          where: args,
          include: [db.models.ban, db.models.mute, db.models.kick, db.models.warn],
          offset,
          limit,
        });
      },
    },
    player: {
      type: Types.Player,
      args: {
        uuid: {
          type: GraphQLID,
        },
        name: {
          type: GraphQLString,
        },
      },
      resolve(root, args) {
        if (args.uuid) {
          return db.models.player.findById(args.uuid);
        } if (args.name) {
          return db.models.player.findOne({
            where: { name: args.name },
            include: [db.models.ban, db.models.mute, db.models.kick, db.models.warn],
          });
        }
        throw new Error('Specify either uuid or name');
      },
    },
    bans: {
      type: new GraphQLList(Types.Ban),
      args: {
        banStaff: {
          type: GraphQLString,
          description: 'Only show bans by staff member nickname',
        },
        banState: {
          type: GraphQLBoolean,
          description: 'Filter by active / inactive bans',
        },
        limit: {
          type: GraphQLInt,
          description: 'Limits the number of results returned in the page. Defaults to 10.',
          defaultValue: 10,
        },
        offset: {
          type: GraphQLInt,
        },
        desc: {
          type: GraphQLBoolean,
          description: 'Reverse sorting order true = descending',
          defaultValue: true,
        },
        // TODO: alias should be the same as in types. How to filter by attributes?
        // TODO: Date range filter
      },
      resolve(root, args) {
        const { offset, limit } = args;
        const order = [
          ['id', args.desc ? 'DESC' : 'ASC'],
        ];
        delete args.offset;
        delete args.limit;
        delete args.desc;
        return db.models.ban.findAll({
          where: args, include: [db.models.player], offset, limit, order,
        });
      },
    },
    ban: {
      type: Types.Ban,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve(root, args) {
        return db.models.ban.findById(args.id);
      },
    },
    mutes: {
      type: new GraphQLList(Types.Mute),
      args: {
        muteStaff: {
          type: GraphQLString,
          description: 'Only show mutes by staff member nickname',
        },
        muteState: {
          type: GraphQLBoolean,
          description: 'Filter by active / inactive mutes',
        },
        limit: {
          type: GraphQLInt,
          description: 'Limits the number of results returned in the page. Defaults to 10.',
          defaultValue: 10,
        },
        offset: {
          type: GraphQLInt,
        },
        desc: {
          type: GraphQLBoolean,
          description: 'Reverse sorting order true = descending',
          defaultValue: true,
        },
        // TODO: alias should be the same as in types. How to filter by attributes?
        // TODO: Date range filter
      },
      resolve(root, args) {
        const { offset, limit } = args;
        const order = [
          ['id', args.desc ? 'DESC' : 'ASC'],
        ];
        delete args.offset;
        delete args.limit;
        delete args.desc;
        return db.models.mute.findAll({
          where: args, include: [db.models.player], offset, limit, order,
        });
      },
    },
    mute: {
      type: Types.Mute,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve(root, args) {
        return db.models.mute.findById(args.id);
      },
    },
    kicks: {
      type: new GraphQLList(Types.Kick),
      args: {
        kickStaff: {
          type: GraphQLString,
          description: 'Only show kicks by staff member nickname',
        },
        limit: {
          type: GraphQLInt,
          description: 'Limits the number of results returned in the page. Defaults to 10.',
          defaultValue: 10,
        },
        offset: {
          type: GraphQLInt,
        },
        desc: {
          type: GraphQLBoolean,
          description: 'Reverse sorting order true = descending',
          defaultValue: true,
        },
        // TODO: alias should be the same as in types. How to filter by attributes?
        // TODO: Date range filter
      },
      resolve(root, args) {
        const { offset, limit } = args;
        const order = [
          ['id', args.desc ? 'DESC' : 'ASC'],
        ];
        delete args.offset;
        delete args.limit;
        delete args.desc;
        return db.models.kick.findAll({
          where: args, include: [db.models.player], offset, limit, order,
        });
      },
    },
    kick: {
      type: Types.Kick,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve(root, args) {
        return db.models.kick.findById(args.id);
      },
    },
    warns: {
      type: new GraphQLList(Types.Warn),
      args: {
        warnStaff: {
          type: GraphQLString,
          description: 'Only show warns by staff member nickname',
        },
        limit: {
          type: GraphQLInt,
          description: 'Limits the number of results returned in the page. Defaults to 10.',
          defaultValue: 10,
        },
        offset: {
          type: GraphQLInt,
        },
        desc: {
          type: GraphQLBoolean,
          description: 'Reverse sorting order true = descending',
          defaultValue: true,
        },
        // TODO: alias should be the same as in types. How to filter by attributes?
        // TODO: Date range filter
      },
      resolve(root, args) {
        const { offset, limit } = args;
        const order = [
          ['id', args.desc ? 'DESC' : 'ASC'],
        ];
        delete args.offset;
        delete args.limit;
        delete args.desc;
        return db.models.warn.findAll({
          where: args, include: [db.models.player], offset, limit, order,
        });
      },
    },
    warn: {
      type: Types.Warn,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve(root, args) {
        return db.models.warn.findById(args.id);
      },
    },
  };
};
