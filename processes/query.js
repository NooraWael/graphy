
export const queryGetUserInfo = `
{
  user {
    id
    campus
    attrs
    login
    email
    validAudits: audits_aggregate(where: {grade: {_gte: 1}}) {
      aggregate {
        count
      }
    }
    failedAudits: audits_aggregate(where: {grade: {_lt: 1}}) {
      aggregate {
        count
      }
    }
  }
}
`;


export const querySkills = `{
  user(where: {login: {_eq: "${localStorage.getItem('username')}"}}) {
    transactions(
      where: {
        _and: [
          {type: {_like: "%skill%"}},
          {object: {type: {_eq: "project"}}},
          {type: {_in: ["skill_go", "skill_js", "skill_html", "skill_css", "skill_unix", "skill_docker", "skill_sql", "skill_technologies"]}}
        ]
      }
      order_by: [{type: asc}, {createdAt: desc}]
      distinct_on: type
    ) {
      createdAt
      amount
      type
      path
      user {
        login
      }
      userId
      object {
        name
        type
      }
    }
  }
}
`;

export const techSkill = `{
  user(where: {login: {_eq: "${localStorage.getItem('username')}"}}) {
    transactions(
      where: {
        _and: [
          {type: {_like: "%skill%"}},
          {object: {type: {_eq: "project"}}},
          {type: {_in: ["skill_prog", "skill_algo", "skill_sys-admin", "skill_front-end", "skill_back-end", "skill_stats", "skill_ai", "skill_game", "skill_tcp"]}}
        ]
      }
      order_by: [{type: asc}, {createdAt: desc}]
      distinct_on: type
    ) {
      createdAt
      amount
      type
      path
      user {
        login
      }
      userId
      object {
        name
        type
      }
    }
  }
}`
;

export const getLevel = ` {
  transaction(order_by : {amount:desc},limit : 1 , where : {type : {_eq : "level"}}){
    amount
  }
}`;