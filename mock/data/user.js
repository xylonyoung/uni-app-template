import createMock from '../index'

export default {
  'api/user.get': response => user(response),
  'api-login.post': response => login(response),
  'agreement.get': () => agreement()
}

function user(response) {
  return createMock({
    data: {
      name: 'Angelina Jolie',
      avatar: 'https://avatarfiles.alphacoders.com/880/88081.jpg'
    }
  })
}

function login(response) {
  const data = JSON.parse(response.body)

  if (data.username === 'guest' && data.password === '123456') {
    return createMock({
      data: 'token'
    })
  } else {
    return createMock({
      code: -1,
      message: 'User is not found or invalid password.'
    })
  }
}

function agreement() {
  return createMock({
    data: { en: agreementEn, zh: agreementZh }
  })
}

const agreementZh = `
<h1>小米帐号使用协议</h1>
<p>欢迎您注册、使用小米帐号！</p>
<p>
  本协议系您与小米科技有限责任公司就小米帐号的注册和使用而订立的。<strong>小米科技有限责任公司（如下简称“小米”）在此特别提醒您认真阅读、充分理解本协议各条款，特别是涉及服务费用条款，免除或者限制小米责任的条款，对您的权利限制条款，争议解决和法律适用条款等，此类条款将以加粗的形式提示您注意。</strong>请您审慎阅读并选择接受或不接受本协议（限制民事行为能力人应在监护人或法定代理人陪同下阅读）。<strong>除非您接受本协议所有条款，否则您无权注册、使用小米帐号。您的注册和使用小米帐号行为将视为您已充分理解本协议（即本协议及后续更新版本或开通或使用某项服务的单项协议），并同意接受本协议各项条款的约束。</strong>
</p>
<h2>一、 关于小米帐号</h2>
<p>1．小米帐号系由小米所有的用于识别您身份的标识。帐号的所有权属于小米，您作为初始申请注册人仅拥有您所注册帐号的使用权。</p>
<p>
  2．您可通过小米帐号享受小米及关联公司提供的单项服务包括但不限于小米网、应用商店、米家有品、云服务、主题商店、lot平台等服务，您亦可通过小米帐号向小米购买米币以便您享受小米及关联公司的各种虚拟产品和增值服务（如游戏、主题、电子书等）。
</p>
<p>3.
  本服务条款的效力范围及于小米及关联公司的一切产品和服务，您在享受任何单项服务时，应当受本服务条款的约束。当您使用小米各单项服务时，您同意以单项服务要求的方式同意该单项服务的服务条款包括但不限于《小米网用户协议》、《小米生活用户协议》、《MIOT平台服务协议》以及小米在该单项服务中发出的各类公告（下列简称为“单项条款”），在此情况下单项条款与本服务条款同时对您产生效力。若单项条款与本服务条款存在同类条款的冲突，则在单项条款约束范围内应以单项条款为准。
</p>
<h2>二、帐号使用规则</h2>
<h3>1．注册帐号</h3>
<p>1.1 您确认，在您开始注册程序使用小米服务前，您应当具备中华人民共和国法律规定的与您行为相适应的民事行为能力。若您不具备前述与您行为相适应的民事行为能力，则您及您的监护人应依照法律规定承担因此而导致的一切后果。</p>
<p>1.2
  您应提供及时、详尽及准确的个人资料，并不断更新注册资料，符合及时、详尽、准确的要求。<strong>您保证在注册时所提交的所有资料（包括但不限于手机号码、邮箱等）真实、准确、合法、有效且系您本人的资料。如果因注册信息不真实或更新不及时而引发的相关问题，
    小米不负任何责任。</strong>您可以通过小米帐号设置页面查询、更正您的信息，<strong>您应当通过真实身份信息认证注册帐号</strong>，且您提交的帐号名称、头像和简介等注册信息中不得出现违法和不良信息，经小米审核，如存在上述情况，小米将不予注册；同时，在注册后，如发现您以虚假信息骗取帐号名称注册，或您的帐号头像、简介等注册信息存在违法和不良信息的，<strong>小米有权不经通知单方采取限期改正、暂停使用、终止帐号等措施。</strong>当您按照注册页面提示填写信息、阅读并同意本协议条款且完成全部注册程序后，您可获得小米帐号并成为小米用户。
</p>
<h3>2.帐号使用</h3>
<p><strong>2.1 您应对您帐号项下的所有行为结果（包括但不限于在线签署各类单项条款、发布信息、购买商品及服务及披露信息等）负责。</strong></p>
<p>2.2
  由于您的小米帐号关联您的个人信息及小米商业信息，您的小米帐号仅限您本人使用。未经小米同意，您直接或间接授权第三方使用您小米帐号或获取您帐号项下信息的行为无效。如小米根据小米各平台规则中约定的违约认定程序及标准判断您小米帐号的使用可能危及您的帐号安全及或小米信息安全的，小米可拒绝提供相应服务或终止本协议。
</p>
<p>2.3 若您选择第三方帐号登陆小米的服务，第三方帐号将与您的小米帐号相关联，小米将根据您授权第三方提供的信息而使用您的信息（如头像）。您后续使用该小米帐号的行为受本协议约束。</p>
<h3>3.帐号保管和找回</h3>
<p>3.1
  小米帐号包括帐号名称和密码，您可使用设置的帐号名称（包括帐号ID、手机号）和密码登录，您应妥善保管好您的帐号及密码，定期修改密码，<strong>因您个人原因导致的帐号信息遗失，如需找回小米帐号信息，请按照小米帐号找回流程提供相应的信息，并确保提供的信息合法真实有效，若提供的信息不符合要求，无法通过小米安全验证，小米有权拒绝提供帐号找回服务；</strong>
</p>
<p>3.2 如果您当前使用的小米帐号并非您初始申请注册的或通过小米提供的其他途径获得的，但您却知悉该小米帐号当前的密码，您不得用该小米帐号登录或进行任何操作，并请您在第一时间通知小米或者该小米帐号的初始申请注册人。</p>
<h3>4．帐号转让</h3>
<p>4.1
  您可在本协议约定的范围内使用小米帐号，您不得恶意注册小米帐号，不得赠与、借用、租用、有偿或无偿转让或售卖小米帐号或者以其他方式许可非初始申请注册人使用小米帐号，小米有权对上述行为进行独立判断并处理，您应当自行承担由此产生的任何责任，<strong>同时小米保留追究上述行为人法律责任的权利。且由此产生的一切责任均由您承担。</strong>
</p>
<strong>
  <p>4.2 小米有权根据法律法规对您采取以下措施：</p>
  <p>4.2.1 如您违反法律法规、小米各单项条款或业务规则的规定，小米有权进行独立判断并随时采取限期改正、暂停使用、终止您对小米帐号的使用，且根据实际情况决定是否恢复使用。</p>
  <p>4.2.2 如果小米发现您并非该帐号初始申请注册人，小米有权在未经通知的情况下终止您使用该帐号。</p>
  <p>4.2.3 小米按照本规则或相关法律法规，限期改正、暂停使用或终止您对小米帐号的使用，而由此给您带来的损失（包括但不限于通信中断，用户资料、邮件和相关数据等的清空等），由您自行承担。</p>
</strong>
<h3>5.帐号回收</h3>
<p>
  <strong>5.1为了防止资源占用，如您连续24个月未使用您的小米帐号或未通过小米认可的其他方式登录过您的帐号，小米有权对该帐号进行注销，您将不能再通过该帐号登录或使用相关服务。如该帐号有关联的待处理交易或余额等，小米会在合理范围内协助您处理，请您按照小米提示的方式进行操作。</strong>
</p>
<h3>6. 帐号安全</h3>
<p><strong>6.1 您的帐号为您自行设置并由您保管，小米任何时候均不会主动要求您提供您的帐号密码。建议您采取特定措施保护您的帐号安全，包括但不限于安装防病毒木马软件、定期更改密码等措施。</strong></p>
<p>6.2 小米帐号因您主动泄露或因您遭受他人攻击、诈骗等行为导致的损失及后果，小米并不承担责任，您应通过司法、行政等救济途径向侵权行为人追偿。</p>
<h3><strong>7.帐号注销</strong></h3>
<p>7.1 在需要终止使用小米帐号服务时，符合以下条件的，您可以申请注销您的小米帐号。</p>
<p>7.1.1 您仅能申请注销您本人的帐号，并依照小米的流程进行注销；</p>
<p>7.1.2 您仍应对您在注销帐号前且使用小米服务期间的行为承担相应责任。 </p>
<p><strong>7.1.3 您应当知晓您的帐号终止意味着您的用户内容将从我们的活动数据库中删除。</strong></p>
<h2>三、用户权利和义务</h2>
<p>1.您在使用小米服务时，必须遵守《网络安全法》、《互联网新闻信息服务管理规定》等中华人民共和国相关法律法规的规定，您应同意将不会利用本服务进行任何违法或不正当的活动，包括但不限于下列行为:</p>
<p>1.1上载、展示、张贴、传播或以其他方式传送含有下列内容之一的信息：</p>
<ul>
  <li>1.1.1 反对宪法所确定的基本原则的；</li>
  <li>1.1.2 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</li>
  <li>1.1.3 损害国家荣誉和利益的；</li>
  <li>1.1.4 煽动民族仇恨、民族歧视、破坏民族团结的；</li>
  <li>1.1.5 破坏国家宗教政策，宣扬邪教和封建迷信的；</li>
  <li>1.1.6 散布谣言，扰乱社会秩序，破坏社会稳定的；</li>
  <li>1.1.7 散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；</li>
  <li>1.1.8 侮辱或者诽谤他人，侵害他人合法权利的；</li>
  <li>1.1.9 含有虚假、有害、胁迫、侵害他人隐私、骚扰、侵害、中伤、粗俗、猥亵、或其他道德上令人反感的内容；</li>
  <li>1.1.10 含有中国法律、法规、规章、条例以及任何具有法律效力之规范所限制或禁止的其他内容的；</li>
</ul>
<p>1.2 不利用小米服务从事以下活动：</p>
<ul>
  <li>1.2.1 未经允许，进入计算机信息网络或者使用计算机信息网络资源的；</li>
  <li>1.2.2 未经允许，对计算机信息网络功能进行删除、修改或者增加的；</li>
  <li>1.2.3 未经允许，对进入计算机信息网络中存储、处理或者传输的数据和应用程序进行删除、修改或者增加的；</li>
  <li>1.2.4 故意制作、传播计算机病毒等破坏性程序的；</li>
  <li>1.2.5 进行任何诸如发布广告、销售商品的商业行为，或者进行任何非法的侵害小米利益的行为，如贩卖可币、游戏币、外挂、道具等；</li>
  <li>1.2.6 其他危害计算机信息网络安全的行为。</li>
</ul>
<p>
  <strong>2.您违反本协议或相关的服务条款的规定，导致或产生的任何第三方向小米与合作公司、关联公司主张的任何索赔、要求或损失，包括合理的律师费，您同意赔偿小米与合作公司、关联公司，并使之免受损害。同时，小米有权视您的行为性质，采取包括但不限于删除发布信息内容、暂停使用许可、终止服务、限制使用小米帐号、追究法律责任等措施。同时，小米会视司法部门的要求，协助调查。</strong>
</p>
<p>3.您不得对小米服务任何部分或小米服务之使用或获得，进行复制、拷贝、出售、转售或用于任何其他商业目的。</p>
<p>4.您须对自己在使用小米服务过程中的行为承担法律责任。您承担法律责任的形式包括但不限于：对受到侵害者进行赔偿，以及在小米首先承担了因您的行为导致的行政处罚或侵权损害赔偿责任后，您应给予小米等额的赔偿。</p>
<p>5.在任何情况下，小米都不对您或任何第三方因本协议产生的任何间接性、后果性、惩戒性的、偶然的、特殊或惩罚性的损害赔偿承担责任。</p>
<h2>四 免责声明</h2>
<h3><strong>1.如发生下述情形，小米不承担任何法律责任： </strong></h3>
<p>1.1 依据法律规定或相关政府部门的要求提供您的个人信息；</p>
<p>1.2 由于您的使用不当或其他自身原因而导致任何个人信息的泄露；</p>
<p>1.3 任何由于黑客攻击，电脑病毒的侵入，非法内容信息、骚扰信息的屏蔽，政府管制以及其他任何网络、技术、通信线路、信息安全管理措施等原因造成的服务中断、受阻等不能满足您要求的情形；</p>
<p>1.4 因第三方如运营商的通讯线路故障、技术问题、网络、电脑故障、系统不稳定及其他因不可抗力造成的损失的情形；</p>
<p>1.5 使用小米产品、程序及服务可能存在的来自他人匿名或冒名的含有威胁、诽谤、令人反感或非法内容的信息而招致的风险；</p>
<p>1.6 用户之间通过本网站或小米产品、程序及服务与其他用户交往，因受误导或欺骗而导致或可能导致的任何心理、生理上的伤害以及经济上的损失；</p>
<p>1.7 小米服务明文声明，不以明示、默示或以任何形式对小米及其合作公司服务之及时性、安全性、准确性做出担保。</p>
<p>1.8 您在利用小米帐号所发布的任何内容并不代表和反映小米的任何观点或政策，小米对此不承担任何责任。</p>
<p>1.9
  在任何情况下，小米均不对任何间接性、后果性、惩罚性、偶然性、特殊性或刑罚性的损害，包括因您使用小米服务而遭受的利润损失，承担责任。尽管本协议中可能含有相悖的规定，我们对您承担的全部责任，无论因何原因或何种行为方式，始终不超过您在注册期内因使用小米服务而支付给小米的费用(如有)。
</p>
<p>2. 您可以选择使用您已有的第三方帐号关联小米帐号，小米对于因第三方原因对您造成的损失不承担任何责任。</p>
<h2>五、知识产权</h2>
<p>1.
  您在小米发布的信息不得侵犯任何第三人的知识产权，未经具有相关所有权人之事先书面同意，您不得以任何方式上传、发布、修改、传播或复制任何受著作权保护的材料、商标或属于其他人的专有信息。如果收到任何著作权人或其合法代表发给小米的适当通知后，我们将在审查的基础上移除该等侵犯他人著作权的内容。
</p>
<p>2.
  您在使用小米服务时利用小米帐号发表上传的文字、图片、视频、软件以及表演等原创信息的知识产权归您所有，但是您确认您对该等信息的发表、上传行为视同为对小米非独占地、永久地、不可撤销地授予该等信息相关全部知识产权的使用、复制等权利，并且您同意小米可转授权上述权利。
</p>
<p>3.
  除非经过小米的在先书面同意，您未获得权利使用小米的任何知识产权。您保证、陈述并承诺您尊重小米的知识产权。您不会以自己名义或促使第三方，也不会同意或放任任何第三方，为了其任何营销、广告、促销或其他目的，在任何法域、以任何方式申请与小米或小米关联公司商标相似的商标、域名、无线网站、互联网搜索词或任何商号、服务标志。如出现上述情况，您须将所有相关权利转让给小米，费用由您承担。您保证、陈述并承诺，不会使用以下名称（包括但不限于
  “雷军”、小米”、“米联”、 “米吧”、“小米商城”、“小米网”、“红米”、“米兔”、“Xiaomi”、 “MIUI”、“米家”，上述品牌的附属标志及图案（包括但不限于 <img width="20" height="20" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAMAAAGg8xQEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJwUExURf///8jHxmVkYjw8OkNDQYWEgujo54yLiAgIBwAAACkoJsbGw66tqwICAhUUFAwMCykoJ+Pi4fj39zU1MwUFBYKAftnY18rJyExLSn19etvb2lpZWGtqZ+jm5SgoJz08O8/OzCcnJbm4tmJhXh4dHV9eXFlYV5STkO/u7PLx8BQUEjUzML+9u2tpZz49PNzb2qampD09PNHQz/Py8WloZgQDAwQEA0ZEQ/v7+2hnZQ8ODcvKyDEwL7i3tjAwLrKxr1hYVlNRTzQyMfj39QsKCry8ubW0sgQEBFRTTyQkI1hXVSQkIu7t62lpZyAfHejm5N3c2RAQDzMyLxgXFoB/fgEBAIiHhZKRjwYGBqmnpqCfnQMDAl1bWCgnJs/OzQ0NDAYGBWVlY5aVk5GRjpqZlmppZxwcGouKiBkYF728umJiYH5+e1FQTv///tPS0fj49nV0ckhIReTl47y7uXFxb1laWFxbWlxcW1paWKGfnfPz8sTEwq6sqN/d2uTj4pOQjKyppcjGwurq6PHx8Pz8++Df3cPCvaKinoKBfJSSjnVzbMPBvO7u7m1sat3b2qimorSzr9rY1paUjZmXkZSSja2ppcTCvqimoIWCfo6MiOrp58C8tnhzan56cpKNg66qpfPz8Y+OiOPj4a+tqaSin7m3s4uGfoSBepuZlHh0bZOQi3NvaJuYkp6blf7//+jo5f///efk3dXRxNbTxtjUxt3b1P//+v//+/Du6qSinba0rt/c0srHvLSwqNXTyaqpoNLPxa6rocXCu/f18f/+/P//+P//9v//9////P789//89v789v//+f79+v/9+QAAAHpsTc8AAADQdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAE/DmzAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABNElEQVQoU3VSsU7EMAx9q/mK/AJTlYWh0ymdsuQLIgamSplAyQpLJuZTxzLcgE5ia0+VQOp3Ybs9YOGpdexn1/GzClgwkhigAsbS5jt0clCwgZk+pGPk8FY4EFq1oDsHHwN57SJISx5P3IdzjKIcWuJ6u8ckWetxJi/RDiGfS0HN7CV+1xWrWDYC046bA2TypLMBhSzqPjB5VsGd9ColbhJluHv1z+BEIRdeI/lAXNpvF1Mj+T8wGRjmCpn1OKDGMQ4inUfRkX4Q9PPO7OEVLVEopiHqd0JgOi7VLVvqgnNRV4QXHres6st6BA244UFUbGCeiUR0YM08c9j5SCxOrJNdXMX8wqkA4LN3zj3Iw8YuT0r+iziGY6q2PF5KiENOy1uQvwLv08c08VmXS5nztJhlxtc3mKJcFkJZuOMAAAAASUVORK5CYII=" alt="">、<img width="25" height="20" src="data:image/png;base64,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" alt=""> 、<img width="23" height="20" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAATCAYAAAH9t/2tAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAASXSURBVDhPjVVrUJRlFN7/6kQhsCzLwrKAcRWiARNGTSBiUQRhsn40GgEBcZNyargIqCAXQ0HESxcEd1UYNTCEWJPbgqkoJJNFXrimEMJCyf32dL53F5CAmZ6Zb773vOc93znvcy4fD4TbDUoMDqrAhLq6aux6z18tzIEJKSmH1MLq1avYovqGQq2xsLREamoKeM33GuHs/BbTjo4MA7MzEBoaLnzMzt4O5deu4k0HeyYzxfT0FDIy0iA/d5ZtcuBpa2vjtwe/YnJinG1ER4UjKTFBbeHg8Abb7O5qh75AyNZMcTIvFzJZIfz9fdkmh3nnAQG7MTE+jsMpSTh65LBaMTU1ie3bpXiN/AmFQjg6OWKr61ast7PDWl0d2Npa4W7jLfYB3nVFJfYnxDEhJDiIfAvA5/MhEOhDYGCAt7dsQldXBzransDbe9uC6+uKCvZOSoyHhYUFREZG8PfzxdjoCOkqmY7DvMHLyM3NRuyX+zQS6HI78UlwIC7IC5Y3+C/G6dITxCP3LDLo+6sHRRdkSD6QjOzsLNxvuqPRLIAZlP1QChElUktLC9Y21nBzd4OLiwsMiDE9fT4iwkPYYQ68bV6e4OsLkJaqLhgOfw+pKM/TbN1QXwcra0usW2eO/v4+8Nxct2BkeBg/31TCimpJh3jnaDUyNobYRILUQ8nMcM/uD1FedlUd0sEDiYz/fZ/HYGhwgB3gUFx0HhKJBLYU5hyYwfjYKFp/f4Anjx/BlTyKRCK6iw0Kz+azQ0plLXtzWMSSPl3ws5holsS8E8dhTnG33G/SaNVYZMCht6cHEZ+GQKH4kbpgBheJ5pzsoziSkQ5vqrclBp0d7axXvvn6FJNP5OZQ0YchPS0VXlL3pQYcpiYnNStQp0ywDHPZHh5+sdSg/3kfSkouIzIiDJs3b4K5uRlMTMSUKz70+HrEpj4VpgjGYmPYEHue0ncRF/sFqqt+IvJGNF9ZAHPQ1dlO5EQxUtbq6EBXVxdO1EORkeE4LytA4+2bePhHK7q7u6k1OvHoYSsalDVEZA6CggLgtMERJpQuQ3LMtfXpU7msK5iDsNBgrFqzhiIS4+OAPbh3t5EpMDuLxju3cCwrk/owEH5+OyGVesLHdwfe/2AXYqIjUXxRjvb2Ns3xGVSUl7GWE4tNYGoqoZINVt/g2bOnGt7GKENZsLezJTr4MDAQwp7mlY+PN6L3RlLjxyIhPhZRURHw8HBn5Ss0FLGkSb2kqKJxyKG35yk6iRUO8zmYpYjzqI8NhAJ4vOMGRaV6IHDo7e1BfV0trlwqwrWyUjQ3N7Fi5fDinyEcp7KxsHgd621toKytZvtzWLYqOHAOnJ03suhMJKaUHzOaZdb02MDUzIx1rphoDQ78CH/SyFoJKzpQDTzH0a8yICvMX7Y62tseI+VgEkpLr2BA1Y96+svUVFehrrYGKpUKAwP9aGn5ZWUHL0N2Lh+6ejqM71e0XoXzxg1s+M/hzOmTyExPQc2NCqq6QuyPj0POsUz4+nj9Pwcc2mhqh4YGoaDgO83OAkq+v0yD4lucofKUywspoAJcKpZjb1QY/gUY92lyBxaWIAAAAABJRU5ErkJggg==" alt=""> 、<img width="20" height="20" src="data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAYACIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD1zwb8MvEXj61nudGt4biGF9j75tnz1uH4A+Ngpb7Fb4H/AE8JXon7Ne7/AIV94qOfL+d//QK5n4X+CIPGHw913W77UtU+3WckwTbeP/BX4Xh8nw08PRvDmnPml8X8p+5YnO8bTxFbllGMISjH4f5jjfEfwn8U+E7E32oaeDZj/WTQPv2VTsfAOuap4Zm8Q29vD/ZUQcvNvr2n4T6hea18CNfN5cNd+WJkUz/Oe9V/h4p/4Zc1QHp9ncCrlkmDlKM4c3LKEpf+Ai/t7G04yU+XnjOMP/Aj578yiq3z0V+XvFTufqiw8GrnV+G/H2t+E9Pu7LS54Yba6OZFkTpSeHfH+teGdIudJ02dEtLrf5qbP79FFe1HMMTTVLllseVLKsHUdRygtdxdF8e634c0G40OxnjTTZ95lXZ030af8QNb0vws3hu1uI00qWN42h2UUVo8yxUNp9LfImOVYOXNeC+K/wAzmfLooorzPZRPU9rI/9k=" alt=""> 等）作为企业、商户、服务或产品名称的一部分，亦不会使用小米商标或近似商标的知识产权。如因您违反本条款约定而给小米造成损失的，该损失全部由您承担。</p>
<h2>六、 修订</h2>
<p>1.
  鉴于互联网相关技术、市场、业务模式等等的发展迅速，您同意，小米有权随时根据中华人民共和国有关法律、法规的变化、互联网的发展以及公司经营状况和经营策略的调整等不定时地制定、修改本协议及各类规则。<strong>如有修订，小米将通过法定程序通知。经修订的协议、规则一经公布，则立即自动生效，且成为本服务协议不可分割的一部分。如您不同意上述修订，则您必须立即停止使用本协议下各项服务。</strong>您继续登录或继续使用小米服务，则表明您认可并接受经修订的协议、规则。
</p>
<h2>七、 终止 </h2>
<p>7.1 本协议自您接受之日起生效，在您使用小米服务的过程中持续有效，直至依据本协议终止；</p>
<p>7.2 尽管有上述规定，如果您使用小米服务的时间早于您接受本协议的时间，您在此知晓或应当知晓并同意本协议于您第一次使用小米服务时生效，除非依据本协议提前终止。</p>
<p>7.3 我们可能会依据法律的规定，保留您使用小米服务、或者小米帐号的权利；无论是否通知，我们将在任何时间以任何原因终止本协议，包括出于善意地相信您违反了我们可接受使用政策或本协议的其他规定。</p>
<p>7.4 不受前款规定所限，如果您侵犯第三人的著作权且小米接到著作权人或著作权人的合法代理人的通知后，小米保留终止本协议的权利。</p>
<h2>八、其他</h2>
<p>8.1 反馈 </p>
<p>8.1.1 您对小米提出建议（或称“反馈”），即视为您向小米转让“反馈”的全部权利并同意小米有权利以任何合理方式使用此反馈及其相关信息。我们将视此类反馈信息为非保密且非专有；</p>
<p>8.1.2 您已同意您不会向小米提供任何您视为保密和专有的信息；</p>
<p>8.2 隐私政策</p>
<p>8.2.1 请查阅我们的《隐私政策》，《隐私政策》为与本协议效力等同且不可分割的一部分。</p>
<p>8.3 通知</p>
<p>8.3.1
  在注册小米帐号时，您应该向小米提供真实有效的联系方式（包括您的电子邮件地址、手机号码等），对于联系方式发生变更的，您有义务及时更新有关信息，并保持可被联系的状态。<strong>小米将向您的上述联系方式的其中之一或其中若干向您送达各类通知，而此类通知的内容可能对您的权利义务产生重大的有利或不利影响，请您务必及时关注。</strong>您所提供的电子邮件地址或手机号码无法使用或者因任何原因我们无法将通知送达给您而产生的风险，由您自行承担。
</p>
<p>8.4 适用法律</p>
<p><strong>8.4.1 本协议适用中华人民共和国法律。</strong></p>
<p><strong>8.4.2
    如果双方发生纠纷，应本着友好的原则协商解决；如协商不成，应向北京市海淀区人民法院提起诉讼。若单项条款与本服务条款在管辖约定内容上存在冲突，则在单项条款约束范围内应以单项条款为准。</strong></p>
<p>8.5 独立性</p>
<p>8.5.1 若本协议中的某些条款因故无法适用，则本协议的其他条款继续适用且无法适用的条款将会被修改，以便其能够依法适用。</p>`

const agreementEn = `<h1>Mi Account User Agreement</h1>
<p>Welcome to register and use Mi Account!</p>
<p>This Agreement is entered into by and between you and Xiaomi Technology Co.Ltd. with respect to the
  registration
  and use of the Mi Account. <strong>Xiaomi Technology Co.Ltd. (hereinafter referred to as “Xiaomi”) hereby
    reminds
    you to carefully read and fully understand the terms and conditions of this Agreement, especially the clause
    of
    service fees, the exemption and limitation of Xiaomi’s liability, restrictions on your rights, dispute
    resolution, applicable law, etc. These terms are emphasized in bold form.</strong> Please read carefully and
  choose to accept or not accept this Agreement (Minors shall be under the guidance of a guardian or legal
  representative while reading this Agreement). <strong>You shall not have the right to register and use Mi
    Account
    unless you accept all the terms and conditions of this Agreement. Your registration and continuing use of the
    Mi
    Account will be deemed that you have fully understood this Agreement and agree to be bound by the terms and
    conditions of this Agreement.</strong></p>
<h2>I. Introduction to Mi Account</h2>
<p>1. Mi Account refers to the identification tool which is owned and managed by Xiaomi and which is used for
  verifying the identity of the user. As a registered user, you only have the right to use the Mi Account
  initially
  registered in your own name.</p>
<p>2. You may enjoy the services including but not limited to Xiaomi Website, Mi App Store, Xiaomiyoupin, Cloud
  Service, Theme Store, Lot platform provided by Xiaomi and its affiliates by registering for a Mi Account. You
  may
  also purchase Mi Credits through your Mi Account to enjoy the various virtual products and value-added services
  (such as games, themes, e-books, etc.) of Xiaomi and its affiliates.</p>
<p>3. All the products and services of Xiaomi and its affiliates shall be governed by this Agreement. When you
  enjoy
  any individual service, you shall be bound by the terms and conditions of this Agreement. You agree to bound by
  the Independent Agreements, including but not limited to User Agreement of Xiaomi Website, User Agreement of
  Xiaomi Life, MIOT Platform Service Agreement and various types of announcements issued by Xiaomi in individual
  services (hereinafter referred to as the “Independent Agreements”), as requested when you use Xiaomi's
  individual
  services, in which case the Independent Agreements and this Agreement shall be legally binding at the same time.
  In the event of any conflict between the terms of Independent Agreements and this Agreement on similar issues,
  the
  Independent Agreements shall prevail.</p>
<h2>II. Use Rules of Account</h2>
<h3>1. Registration of Account</h3>
<p>1.1 Before you start the registration procedure and use Mi Account, you shall be a person with full capacity
  for
  civil conduct. Minors are permitted to use Mi Account only with the consent of their parent or guardian. You are
  subject to, and are solely responsible for abidance by all laws and regulations of the jurisdiction in which you
  reside and from which you access or use Mi Account. </p>
<p>1.2 You shall provide timely, detailed and accurate personal information, and constantly update the
  registration
  information in line with the aforementioned requirements. <strong>You warrant that all information you have
    submitted at the time of registration (including but not limited to mobile phone number, email address.) is
    truthful, accurate, legal, and valid and belongs solely to you. Xiaomi will not be responsible for any related
    problems arising from untruthful registration information or untimely updates.</strong> You may check and
  correct your information on the Mi Account setting web pages. You shall use the real identity information to
  authenticate the registered account, and all registration information such as the account name, avatar and
  profile
  submitted by you shall not be illegal or harmful. If the above situation exists after Xiaomi’s examination, the
  registration will not be allowed by Xiaomi; meanwhile, after the registration, if Xiaomi finds that you swindle
  the account name for registration with false information, or if your account avatar, profile and other
  registration information are illegal or harmful, <strong>Xiaomi has the right to take measures unilaterally,
    including but not limited to requesting correction within a time limit, suspending of use and termination the
    use of your account.</strong> You will successfully register a Mi Account and become a Xiaomi registered user
  if
  you follow the registration page prompts to fill out the information, read and accept all the terms of this
  Agreement and complete all registration procedures.</p>
<h3>2. Use of Account</h3>
<p>2.1 You shall be responsible for all acts related to your Mi Account (including but not limited to signing
  various Independent Agreements online, posting information, purchasing goods and services, and disclosing
  information).</p>
<p>2.2 Your Mi Account contains the details about your personal information and Xiaomi business information,
  therefore your Mi Account is for your personal use only. Without the consent of Xiaomi, the behavior that you
  directly or indirectly authorize a third party to use your Mi Account or obtain information related to your
  account is invalid. If Xiaomi, pursuant to the certification procedures and standards for breach as agreed in
  Xiaomi's platform rules, determines that the use of your Mi Account may endanger the security of your account
  and
  Xiaomi's information safety, Xiaomi may refuse to provide services or terminate this Agreement.</p>
<p>2.3 If you choose to log in Xiaomi's service using a third-party account, the third-party account will be
  associated with your Mi Account. Xiaomi will use your information (such as avatar) in accordance with the
  information you provide to the third party. Your subsequent conducts of the use of such Mi Account shall be
  subject to this Agreement.</p>
<h3>3. Custody and Retrieval of Account </h3>
<p>3.1 Mi Account includes account name and password. You may log in with the created account name (including
  account ID, mobile phone number) and password. You shall safeguard your account and password, and change your
  password regularly.<strong>If you need to retrieve the Mi Account information due to losing account issue caused
    by yourself, please provide the corresponding information in accordance with the process of Mi Account
    retrieval, and ensure that the information provided is legal, truthful and valid. If the information provided
    fails to meet the requirements and cannot pass the Xiaomi security verification, Xiaomi has the right to
    refuse
    to provide account retrieval service;</strong></p>
<p>3.2 If your current Mi Account is not initially registered by yourself or is obtained through other ways
  provided
  by Xiaomi, provided that you know the password of such Mi Account, you shall not log in with such Mi Account or
  take any action except notifying Xiaomi or the person initially registered this Mi Account.</p>
<h3>4. Assignment of Account </h3>
<p>4.1 You may use the Mi Account within the scope as agreed in this Agreement. You shall not maliciously register
  the Mi Account, nor give, borrow, rent, assign or sell the Mi Account with or without compensation, or otherwise
  permit the non-initial registrant to use the Mi Account. Xiaomi has the right to independently determine and
  deal
  with the aforementioned behaviors. </p>
<strong>
  <p>4.2 Xiaomi has the right to take the following measures against you in accordance with laws and regulations:
  </p>
  <p>4.2.1 If you violate laws and regulations, Xiaomi's Independent Agreements or business rules, Xiaomi has the
    right to make independent judgments and take measures, including but not limited to requesting correction
    within
    a time limit, suspending of use, termination the use of your Mi Account, and to decide whether to resume the
    use
    of such account pursuant to actual conditions.</p>
  <p>
    4.2.2 If Xiaomi finds that you are not the initial registrant for such account, Xiaomi has the right to
    terminate the use of your account.</p>
  <p>
    4.2.3 Xiaomi will, in accordance with this Agreement or relevant laws and regulations, require you to correct
    within a time limit, suspend or terminate the use of your Mi Account.</p>
</strong>
<h3>5. Account Withdrawal</h3>
<p><strong>5.1 In order to make full use of the resources available through your Mi Account, if you fail to login
    your Mi Account for 24 consecutive months or login your account through other methods approved by Xiaomi,
    Xiaomi
    has the right to terminate the use of your Mi Account and discontinue its provision of services to you. If
    there
    is any pending transaction or balance and the like related to this account, Xiaomi may assist you in the
    reasonable manner. Please follow the instructions of Xiaomi.</strong></p>
<h3>6. Account Security</h3>
<p><strong>6.1 Your account is created and safeguarded by yourself. Xiaomi will not require you to provide your
    password at any time. We recommend that you take appropriate measures to protect your account, including but
    not
    limited to installing anti-virus Trojan software, changing your password regularly.</strong></p>
<p>6.2 Xiaomi will not be liable for any losses and consequences arising out of your accidental disclosure,
  attacks
  or fraud by others. You shall recover from the infringer through judicial, administrative authorities and other
  remedies.</p>
<h3><strong>7. Account Cancellation</strong></h3>
<p>7.1 You may apply for cancellation of your Mi Account if you decide to terminate the use of Mi Account service.
  And the following conditions shall be fulfilled.</p>
<p>7.1.1 You may only apply for cancellation of your own account in accordance with Xiaomi's process; </p>
<p>7.1.2 You shall still be responsible for your behaviors when you enjoy the Xiaomi services prior to
  cancellation
  of your Mi Account.</p>
<p><strong>7.1.3 You shall be aware that the termination of Mi Account means user information will be removed from
    Xiaomi's database.</strong></p>
<h2>III. User’s Rights and Obligations</h2>
<p>1. You are subject to, and are solely responsible for abidance by all laws and regulations of the jurisdiction
  in
  which you reside and from which you access or use Mi Account. When you use Xiaomi services in the People’s
  Republic of China, you shall not use Xiaomi services for any illegal or improper activities, including but not
  limited to the following activities: </p>
<p>1.1 Uploading, displaying, posting, spreading or otherwise transmitting information containing one of the
  following contents:</p>
<ul>
  <li>1.1.1 Opposing the basic principles specified in the Constitution;</li>
  <li>1.1.2 Endangering national security, revealing state secrets, subverting state power, and undermining
    national
    unity;</li>
  <li>1.1.3 Damaging the country's honors and interests; </li>
  <li>1.1.4 Inciting ethnic hatred, ethnic discrimination, and destruction of national unity; </li>
  <li>1.1.5 Breaking religious policies of the State, or blazoning forth evil cults or feudal superstition;</li>
  <li>1.1.6 Disseminating rumors, disrupting social order and undermining social stability;</li>
  <li>1.1.7 Spreading obscenity, pornography, violence, encouraging gambling, murder or terrorism;</li>
  <li>1.1.8 Insulting or slandering others and infringing the legal rights of others;</li>
  <li>1.1.9 Containing false, harmful, coercive content, and invasion of privacy, harassment, infringement,
    slander,
    vulgarity, obscenity, or otherwise morally objectionable content; </li>
  <li>1.1.10 Involving other contents restricted or prohibited by Chinese laws, regulations, rules, ordinances and
    any legally binding norms; </li>
</ul>
<p>1.2 Do not use the Xiaomi services to engage in the following activities:</p>
<ul>
  <li>1.2.1 Entering the computer information network or using computer information network resources, without
    permission; </li>
  <li>1.2.2 Deleting, modifying or adding the computer information network function, without permission; </li>
  <li>1.2.3 Deleting, modifying or adding the data and applications stored, processed or transmitted in the
    computer
    information network, without permission;</li>
  <li>1.2.4 Deliberately making and disseminating destructive programs such as computer viruses and the like;</li>
  <li>1.2.5 Conducting any commercial activities such as advertising, sale of goods, or any illegal acts that
    infringe on the interests of Xiaomi, such as selling coins, game coins, plug-ins, and props, etc.;</li>
  <li>1.2.6 Other behaviors that endanger computer information network security.</li>
</ul>
<p><strong>2. If there is any claim, requirement or loss (including reasonable attorney fees）asserted by any third
    party against Xiaomi, Xiaomi’s partner companies and affiliates arising from your violation of the provisions
    of
    this Agreement or the relevant terms of services, you agree to indemnify and hold harmless Xiaomi, Xiaomi’s
    partner companies and affiliates from any damage. At the same time, Xiaomi has the right, depending on the
    nature of your conduct, to take measures including but not limited to deleting the published information,
    suspending the use of the Mi Account, terminating the services, restricting the use of the Mi Account, and
    seeking liability. Meanwhile, Xiaomi will assist the investigation at the requirements of the judicial
    departments. </strong></p>
<p>3. You shall not replicate, copy, sell, resell or use for any other commercial purposes concerning any part of
  Xiaomi services or the use or acquisition of the Xiaomi services.</p>
<p>4. You shall be legally responsible for your behaviors in the use of Xiaomi services. The forms of legal
  liabilities include but are not limited to, compensation for the victim, and the equivalent compensation that
  you
  shall reimburse to Xiaomi after Xiaomi first assumes the responsibility for administrative punishment or tort
  damage arising from your behaviors. </p>
<h2>IV. Disclaimer</h2>
<h3><strong>1. Xiaomi shall not assume any legal liability in any of the following circumstances: </strong></h3>
<p>1.1 Providing your personal information in accordance with legal provisions or at the requirements of relevant
  government departments;</p>
<p>1.2 Any disclosure of any personal information arising from improper use by yourself or other reasons;</p>
<p>1.3 Any circumstance that fails to meet your requirements arising out of service interruption, blockage, etc.
  caused by hacker attacks, invasion of computer viruses, illegal information, shielding of harassment
  information,
  government regulations, and any other reasons such as network, technology, communication lines, information
  security management measures, etc.;</p>
<p>1.4 Any circumstance arising from third party’s (such as operator's) communication line failures, technical
  problems, network issues, computer failure, system instability and other losses caused by force majeure;</p>
<p>1.5 Any risk arising from the use of Xiaomi’s products, programs and services that may have anonymous or
  impersonating information containing threats, defamatory, offensive or illegal content;</p>
<p>1.6 Any interaction between users and other users through this website or Xiaomi’s products, programs and
  services, results in or may result in any psychological, physical damage and economic loss due to misleading or
  deceptive;</p>
<p>1.7 Xiaomi services expressly declares that the timeliness, safety and accuracy of Xiaomi and its partner
  companies' services are not guaranteed by express, implied or in any form.</p>
<p>1.8 No content posted by you using the Mi Account shall be represent and reflect any opinions or policies of
  Xiaomi, and Xiaomi shall not be responsible for it.</p>
<p>1.9 Under no circumstances shall Xiaomi be liable for any indirect, consequential, punitive, incidental,
  special
  or penal damages, including loss of profits arising from your use of the Xiaomi services. Notwithstanding any
  conflicting provision contained herein, our entire liability to you, whatever any reason or any behavior, shall
  not exceed the fees (if any) that you paid to Xiaomi for the use of the Xiaomi Service during the registration
  period.</p>
<p>2. You may choose to use your existing third-party account to associate the Mi Account. Xiaomi shall be not
  responsible for any damage caused to you by third party’s reason.</p>
<p>3. The warranties, guarantees or liabilities as provided by the local laws applying to you shall not be exclude
  or limited by a contract. Nothing in the terms and conditions of this Agreement shall affect the rights legally
  entitled to you as a consumer, or diminish any of the legal rights and duties that cannot be contractually
  agreed
  to alter or waive. </p>
<h2>V. Intellectual Property Rights</h2>
<p>1. The information you publish in Xiaomi shall not infringe the intellectual property rights of any third
  party.
  Without the prior written consent of the relevant intellectual property owner, you shall not, upload, post,
  modify, spread or replicate any copyrighted materials, trademarks or proprietary information belonging to others
  by any means. After receiving appropriate notice from any copyright owner or its legal representative to Xiaomi,
  we will remove such content of the copyright infringement based on the examination.</p>
<p>2. The intellectual property rights of the original contents (such as the texts, pictures, videos, software and
  performances) posted and uploaded by enjoying Xiaomi Service through Mi Account belong to you, provided that you
  confirm that your publication and uploading of such contents shall be deemed that you non-exclusively,
  permanently
  and irrevocably authorize Xiaomi to use, copy, and exercise other rights of all intellectual property rights
  relating to such contents, and you agree that Xiaomi may sublicense above-mentioned rights.</p>
<p>3. You shall not use any intellectual property rights of Xiaomi without prior written consent of Xiaomi. You
  warrant, represent and undertake that you respect the intellectual property rights of Xiaomi. You will not apply
  or allow any third party to apply for any trademark, domain name, wireless website, Internet search term or any
  trade name, service mark similar to the brand of Xiaomi or its affiliates for any marketing, advertising,
  promotion or other purposes by any means in any jurisdiction. In the event of the above circumstances, you shall
  transfer all relevant rights to Xiaomi at your expense. You warrant, represent and undertake that you will not
  use
  the following names (including but not limited to “Lei Jun”, “Xiaomi”, “Mi Store”, “Xiaomi Website”, “Redmi”,
  “Mi
  Bunny”, “Xiaomi”, “MIUI”, “Mijia”), and the affiliated logos and designs of the above brands (including but not
  limited to <img width="20" height="20" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAMAAAGg8xQEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJwUExURf///8jHxmVkYjw8OkNDQYWEgujo54yLiAgIBwAAACkoJsbGw66tqwICAhUUFAwMCykoJ+Pi4fj39zU1MwUFBYKAftnY18rJyExLSn19etvb2lpZWGtqZ+jm5SgoJz08O8/OzCcnJbm4tmJhXh4dHV9eXFlYV5STkO/u7PLx8BQUEjUzML+9u2tpZz49PNzb2qampD09PNHQz/Py8WloZgQDAwQEA0ZEQ/v7+2hnZQ8ODcvKyDEwL7i3tjAwLrKxr1hYVlNRTzQyMfj39QsKCry8ubW0sgQEBFRTTyQkI1hXVSQkIu7t62lpZyAfHejm5N3c2RAQDzMyLxgXFoB/fgEBAIiHhZKRjwYGBqmnpqCfnQMDAl1bWCgnJs/OzQ0NDAYGBWVlY5aVk5GRjpqZlmppZxwcGouKiBkYF728umJiYH5+e1FQTv///tPS0fj49nV0ckhIReTl47y7uXFxb1laWFxbWlxcW1paWKGfnfPz8sTEwq6sqN/d2uTj4pOQjKyppcjGwurq6PHx8Pz8++Df3cPCvaKinoKBfJSSjnVzbMPBvO7u7m1sat3b2qimorSzr9rY1paUjZmXkZSSja2ppcTCvqimoIWCfo6MiOrp58C8tnhzan56cpKNg66qpfPz8Y+OiOPj4a+tqaSin7m3s4uGfoSBepuZlHh0bZOQi3NvaJuYkp6blf7//+jo5f///efk3dXRxNbTxtjUxt3b1P//+v//+/Du6qSinba0rt/c0srHvLSwqNXTyaqpoNLPxa6rocXCu/f18f/+/P//+P//9v//9////P789//89v789v//+f79+v/9+QAAAHpsTc8AAADQdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wAE/DmzAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABNElEQVQoU3VSsU7EMAx9q/mK/AJTlYWh0ymdsuQLIgamSplAyQpLJuZTxzLcgE5ia0+VQOp3Ybs9YOGpdexn1/GzClgwkhigAsbS5jt0clCwgZk+pGPk8FY4EFq1oDsHHwN57SJISx5P3IdzjKIcWuJ6u8ckWetxJi/RDiGfS0HN7CV+1xWrWDYC046bA2TypLMBhSzqPjB5VsGd9ColbhJluHv1z+BEIRdeI/lAXNpvF1Mj+T8wGRjmCpn1OKDGMQ4inUfRkX4Q9PPO7OEVLVEopiHqd0JgOi7VLVvqgnNRV4QXHres6st6BA244UFUbGCeiUR0YM08c9j5SCxOrJNdXMX8wqkA4LN3zj3Iw8YuT0r+iziGY6q2PF5KiENOy1uQvwLv08c08VmXS5nztJhlxtc3mKJcFkJZuOMAAAAASUVORK5CYII=" alt="">、<img width="25" height="20" src="data:image/png;base64,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" alt=""> 、<img width="23" height="20" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAATCAYAAAH9t/2tAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAASXSURBVDhPjVVrUJRlFN7/6kQhsCzLwrKAcRWiARNGTSBiUQRhsn40GgEBcZNyargIqCAXQ0HESxcEd1UYNTCEWJPbgqkoJJNFXrimEMJCyf32dL53F5CAmZ6Zb773vOc93znvcy4fD4TbDUoMDqrAhLq6aux6z18tzIEJKSmH1MLq1avYovqGQq2xsLREamoKeM33GuHs/BbTjo4MA7MzEBoaLnzMzt4O5deu4k0HeyYzxfT0FDIy0iA/d5ZtcuBpa2vjtwe/YnJinG1ER4UjKTFBbeHg8Abb7O5qh75AyNZMcTIvFzJZIfz9fdkmh3nnAQG7MTE+jsMpSTh65LBaMTU1ie3bpXiN/AmFQjg6OWKr61ast7PDWl0d2Npa4W7jLfYB3nVFJfYnxDEhJDiIfAvA5/MhEOhDYGCAt7dsQldXBzransDbe9uC6+uKCvZOSoyHhYUFREZG8PfzxdjoCOkqmY7DvMHLyM3NRuyX+zQS6HI78UlwIC7IC5Y3+C/G6dITxCP3LDLo+6sHRRdkSD6QjOzsLNxvuqPRLIAZlP1QChElUktLC9Y21nBzd4OLiwsMiDE9fT4iwkPYYQ68bV6e4OsLkJaqLhgOfw+pKM/TbN1QXwcra0usW2eO/v4+8Nxct2BkeBg/31TCimpJh3jnaDUyNobYRILUQ8nMcM/uD1FedlUd0sEDiYz/fZ/HYGhwgB3gUFx0HhKJBLYU5hyYwfjYKFp/f4Anjx/BlTyKRCK6iw0Kz+azQ0plLXtzWMSSPl3ws5holsS8E8dhTnG33G/SaNVYZMCht6cHEZ+GQKH4kbpgBheJ5pzsoziSkQ5vqrclBp0d7axXvvn6FJNP5OZQ0YchPS0VXlL3pQYcpiYnNStQp0ywDHPZHh5+sdSg/3kfSkouIzIiDJs3b4K5uRlMTMSUKz70+HrEpj4VpgjGYmPYEHue0ncRF/sFqqt+IvJGNF9ZAHPQ1dlO5EQxUtbq6EBXVxdO1EORkeE4LytA4+2bePhHK7q7u6k1OvHoYSsalDVEZA6CggLgtMERJpQuQ3LMtfXpU7msK5iDsNBgrFqzhiIS4+OAPbh3t5EpMDuLxju3cCwrk/owEH5+OyGVesLHdwfe/2AXYqIjUXxRjvb2Ns3xGVSUl7GWE4tNYGoqoZINVt/g2bOnGt7GKENZsLezJTr4MDAQwp7mlY+PN6L3RlLjxyIhPhZRURHw8HBn5Ss0FLGkSb2kqKJxyKG35yk6iRUO8zmYpYjzqI8NhAJ4vOMGRaV6IHDo7e1BfV0trlwqwrWyUjQ3N7Fi5fDinyEcp7KxsHgd621toKytZvtzWLYqOHAOnJ03suhMJKaUHzOaZdb02MDUzIx1rphoDQ78CH/SyFoJKzpQDTzH0a8yICvMX7Y62tseI+VgEkpLr2BA1Y96+svUVFehrrYGKpUKAwP9aGn5ZWUHL0N2Lh+6ejqM71e0XoXzxg1s+M/hzOmTyExPQc2NCqq6QuyPj0POsUz4+nj9Pwcc2mhqh4YGoaDgO83OAkq+v0yD4lucofKUywspoAJcKpZjb1QY/gUY92lyBxaWIAAAAABJRU5ErkJggg==" alt=""> 、<img width="20" height="20" src="data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAYACIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD1zwb8MvEXj61nudGt4biGF9j75tnz1uH4A+Ngpb7Fb4H/AE8JXon7Ne7/AIV94qOfL+d//QK5n4X+CIPGHw913W77UtU+3WckwTbeP/BX4Xh8nw08PRvDmnPml8X8p+5YnO8bTxFbllGMISjH4f5jjfEfwn8U+E7E32oaeDZj/WTQPv2VTsfAOuap4Zm8Q29vD/ZUQcvNvr2n4T6hea18CNfN5cNd+WJkUz/Oe9V/h4p/4Zc1QHp9ncCrlkmDlKM4c3LKEpf+Ai/t7G04yU+XnjOMP/Aj578yiq3z0V+XvFTufqiw8GrnV+G/H2t+E9Pu7LS54Yba6OZFkTpSeHfH+teGdIudJ02dEtLrf5qbP79FFe1HMMTTVLllseVLKsHUdRygtdxdF8e634c0G40OxnjTTZ95lXZ030af8QNb0vws3hu1uI00qWN42h2UUVo8yxUNp9LfImOVYOXNeC+K/wAzmfLooorzPZRPU9rI/9k=" alt=""> etc.), as part of the name of the company, merchant, service or product, nor will use intellectual
  property rights of the Xiaomi trademark or similar trademark. The loss caused to Xiaomi arising from your
  violation of the provisions of this Article shall be borne by you.</p>
<h2>VI. Amendment</h2>
<p>1. In consideration of the rapid development of Internet-related technologies, markets, business models, etc.,
  you agree that Xiaomi has the right to regularly formulate and revise this Agreement and various rules in
  accordance with the changes of relevant laws and regulations of the People's Republic of China, the development
  of
  the Internet, and the adjustment of the company's operating conditions and business strategies. <strong>If there
    is any amendment, Xiaomi will notify you of the changes by reasonable means. If you disagree with the above
    amendments, you shall immediately stop using the services under this Agreement.</strong> Your logging into or
  continuing to use the Xiaomi services means that you recognize and accept the revised agreements and rules.</p>
<h2>VII. Termination </h2>
<p>1. This Agreement shall become effective as of the date of your acceptance, and shall remain in force during
  your
  use of the Xiaomi services until terminated in accordance with this Agreement;</p>
<p>2. Notwithstanding the foregoing, if you use the Xiaomi services before you accept this Agreement, you hereby
  know and agree that this Agreement will be effective for the first time you use the Xiaomi services, unless
  terminated earlier in accordance with this Agreement. </p>
<p>3. We may reserve right to allow you to use the Xiaomi services or Mi Account in accordance with the law; we
  will
  terminate this Agreement at any time for any reason with or without notice, including Xiaomi believe that you
  have
  violated our user policy or other provisions of this Agreement.</p>
<p>4. Without being subject to the provisions of the preceding paragraph, if you infringe the copyright of a third
  party, and Xiaomi receives a notice from the copyright owner or its legal representative, Xiaomi reserves the
  right to terminate this Agreement.</p>
<h2>VIII. Miscellaneous</h2>
<p>1. Feedback </p>
<p>1.1 Your suggestion (or “feedback”) to Xiaomi shall be deemed that you transfer all rights of “feedback” to
  Xiaomi, and agree that Xiaomi has the right to use this “feedback” and related information in any reasonable
  way.
  Xiaomi will treat such feedback information as non-confidential and non-proprietary;</p>
<p>1.2 You agree that you will not provide Xiaomi with any information that you consider to be confidential and
  proprietary;</p>
<p>2. Privacy Policy</p>
<p>2.1 Please refer to our “Privacy Policy” that has the same effect with this Agreement and is an integral part
  of
  this Agreement.</p>
<p>3. Notice </p>
<p>3.1 You shall provide a valid email address or cellphone number.. Notices of announcements issued by Xiaomi
  sent
  to you constitute a valid notice.</p>
<p>4. Applicable Law </p>
<p><strong>4.2 If there is any dispute between the parties, the dispute shall be settled through friendly
    negotiation; if the negotiation fails, either parties shall file a lawsuit in the People's Court of Haidian
    District, Beijing. In the event of any conflict between the terms of Independent Agreements and this
    Agreements
    on the issue of jurisdiction, the Independent Agreements shall prevail.</strong></p>
<p>5. Independence</p>
<p>5.1 If any provision of this Agreement is invalid or unenforceable for any reason, then that provision shall be
  modified in order to be valid and enforceable in accordance with the law. However, the remaining provisions of
  this Agreement shall remain valid and binding. </p>`
