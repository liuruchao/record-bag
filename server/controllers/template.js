var create_template = async (ctx, next) => {
  if (ctx.request.header['x-wx-skey']) {
    let skey = ctx.request.header['x-wx-skey'];

    let body = ctx.request.body;
    let fields = body.fields || '';

    let users = await ctx.knex('cSessionInfo').where({
      skey: skey
    }).select('uuid');

    if (users.length > 0) {
      let uuid = users[0].uuid;
      let time = +new Date();
      let tid = await ctx.knex('t_template').insert({
        uuid,
        fields,
        create_time: time,
        last_visit_time: time
      });
      ctx.body = {
        code: 0,
        data: {
          tid: tid[0],
          uuid,
          fields
        }
      }
    }
  } else {
    ctx.body = {
      code: -2,
      error: 'needLogin'
    }
  }
};

var delete_template = async (ctx, next) => {
  if (ctx.request.header['x-wx-skey']) {
    let skey = ctx.request.header['x-wx-skey'];

    let body = ctx.request.body;
    let tid = parseInt(body.tid) || -1;

    let templates = await ctx.knex('t_template').where({
      tid: tid
    }).select();

    if (templates.length > 0) {
      let result = await ctx.knex('t_template').where({
        tid: tid
      }).del();
      ctx.body = {
        code: 0,
        data: templates[0]
      }
    } else {
      ctx.body = {
        code: -1,
        data: {
          error: 'tid_error'
        }
      }
    }
  } else {
    ctx.body = {
      code: -2,
      data: {
        error: 'need_login'
      }
    }
  }
};

var update_template = async (ctx, next) => {
  if (ctx.request.header['x-wx-skey']) {
    let skey = ctx.request.header['x-wx-skey'];

    let body = ctx.request.body;
    let tid = parseInt(body.tid) || -1;
    let fields = body.fields || '';

    let templates = await ctx.knex('t_template').where({
      tid: tid
    }).select();

    if (templates.length > 0) {
      let result = await ctx.knex('t_template').where('tid', '=', tid).update({
        fields,
        last_visit_time: +new Date()
      });
      if (result === 1) {
        let templates = await ctx.knex('t_template').where({
          tid: tid
        }).select();
        ctx.body = {
          code: 0,
          data: templates
        }
      }
    } else {
      ctx.body = {
        code: -1,
        data: {
          error: 'tid_error'
        }
      }
    }
  } else {
    ctx.body = {
      code: -2,
      data: {
        error: 'need_login'
      }
    }
  }
};

var get_templates = async (ctx, next) => {
  if (ctx.request.header['x-wx-skey']) {
    let skey = ctx.request.header['x-wx-skey'];

    let query = ctx.request.query;
    let tid = parseInt(query.tid) || -1;
    let templates = [];
    if (tid !== -1) {
      templates = await ctx.knex('t_template').where({
        tid: tid
      }).select();
    } else {
      templates = await ctx.knex('t_template').select();
    }

    ctx.body = {
      code: 0,
      data: templates
    }
  } else {
    ctx.body = {
      code: -2,
      data: {
        error: 'need_login'
      }
    }
  }
};

module.exports = {
  'POST /template': create_template,
  'DELETE /template': delete_template,
  'PUT /template': update_template,
  'GET /template': get_templates
};