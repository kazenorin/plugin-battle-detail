
import FontAwesome from 'react-fontawesome'
const { React, ReactBootstrap, __ } = window
const { Panel, OverlayTrigger, Tooltip, Row } = ReactBootstrap

import { HPBar } from './bar'
import { getShipName, getItemName } from './utils'

import { Models } from 'lib/battle'
const { StageType, AttackType, HitType, ShipOwner } = Models
const { AirControl, Engagement, Formation, Detection } = Models


const AirControlName = {
  [AirControl.Parity      ]: __("Air Parity"),
  [AirControl.Supremacy   ]: __("Air Supremacy"),
  [AirControl.Superiority ]: __("Air Superiority"),
  [AirControl.Incapability]: __("Air Incapability"),
  [AirControl.Denial      ]: __("Air Denial"),
}

const EngagementName = {
  [Engagement.Parallel     ]: __("Parallel Engagement"),
  [Engagement.Headon       ]: __("Head-on Engagement"),
  [Engagement.TAdvantage   ]: __("Crossing the T (Advantage)"),
  [Engagement.TDisadvantage]: __("Crossing the T (Disadvantage)"),
}

const FormationName = {
  [Formation.Ahead  ]: __("Line Ahead"),
  [Formation.Double ]: __("Double Line"),
  [Formation.Diamond]: __("Diamond"),
  [Formation.Echelon]: __("Echelon"),
  [Formation.Abreast]: __("Line Abreast"),
  [Formation.CruisingAntiSub]: __("Cruising Formation 1 (anti-sub)"),
  [Formation.CruisingForward]: __("Cruising Formation 2 (forward)"),
  [Formation.CruisingDiamond]: __("Cruising Formation 3 (ring)"),
  [Formation.CruisingBattle ]: __("Cruising Formation 4 (battle)"),
}

const DetectionName = {
  [Detection.Success  ]: __('Detection Success'),
  [Detection.SuccessNR]: __('Detection Success') + ' (' + __('not return') + ')',
  [Detection.SuccessNP]: __('Detection Success') + ' (' + __('without plane') + ')',
  [Detection.Failure  ]: __('Detection Failure'),
  [Detection.FailureNR]: __('Detection Failure') + ' (' + __('not return') + ')',
  [Detection.FailureNP]: __('Detection Failure') + ' (' + __('without plane') + ')',
}

const AttackTypeName = {
  [AttackType.Normal              ]: __("AT.Normal"),
  [AttackType.Double              ]: __("AT.Double"),
  [AttackType.Primary_Secondary_CI]: __("AT.Primary_Secondary_CI"),
  [AttackType.Primary_Radar_CI    ]: __("AT.Primary_Radar_CI"),
  [AttackType.Primary_AP_CI       ]: __("AT.Primary_AP_CI"),
  [AttackType.Primary_Primary_CI  ]: __("AT.Primary_Primary_CI"),
  [AttackType.Primary_Torpedo_CI  ]: __("AT.Primary_Torpedo_CI"),
  [AttackType.Torpedo_Torpedo_CI  ]: __("AT.Torpedo_Torpedo_CI"),
}


class EngagementTable extends React.Component {
  render() {
    const e = this.props.engagement
    let rows = []

    if (e.engagement || e.fFormation || e.eFormation)
      rows.push(
        <Row className={"engagement-row"} key={1}>
          <span>{FormationName[e.fFormation]}</span>
          <span>{EngagementName[e.engagement]}</span>
          <span>{FormationName[e.eFormation]}</span>
        </Row>
      )

    if (e.fDetection || e.eDetection)
      rows.push(
        <Row className={"engagement-row"} key={2}>
          <span>{DetectionName[e.fDetection]}</span>
          <span />
          <span>{DetectionName[e.eDetection]}</span>
        </Row>
      )

    if (e.weakened)
      rows.push(
        <Row className={"engagement-row"} key={3}>
          <span />
          <span>{`${__("Gimmick")}: ${e.weakened}`}</span>
          <span />
        </Row>
      )

    if (e.fContact || e.eContact)
      rows.push(
        <Row className={"engagement-row"} key={4}>
          <span>{e.fContact ? `${__("Contact")}: ${getItemName(e.fContact)}` : ''}</span>
          <span />
          <span>{e.eContact ? `${__("Contact")}: ${getItemName(e.eContact)}` : ''}</span>
        </Row>
      )

    if (e.fFlare || e.eFlare)
      rows.push(
        <Row className={"engagement-row"} key={5}>
          <span>{e.fFlare ? `${__("Star Shell")}: ${getShipName(e.fFlare.id)}` : ''}</span>
          <span />
          <span>{e.eFlare ? `${__("Star Shell")}: ${getShipName(e.fFlare.id)}` : ''}</span>
        </Row>
      )

    return <div className={"engagement-table"}>{rows}</div>
  }
}


class PlaneCount extends React.Component {
  render() {
    const {init, now} = this.props
    return init == null ? <span />
      : <span><FontAwesome name='plane' />{init}<FontAwesome name='long-arrow-right' />{now}</span>
  }
}

class AntiAirCICell extends React.Component {
  render() {
    const {aaciKind, aaciShip, aaciItems} = this.props.aerial
    if (aaciKind == null) return <span />

    let tooltip = [].concat(
      (<div key={-1}>{__("Anti-air Kind")}: {aaciKind}</div>),
      aaciItems.map((id, i) => <div key={i}>{getItemName(id)}</div>),
    )

    return (
      <OverlayTrigger placement='top' overlay={
        <Tooltip id="aerial-table-anti-air">
          <div className="anti-air-tooltip">
            {tooltip}
          </div>
        </Tooltip>
      }>
        <span>{__("Anti-air Cut-in")}: {getShipName(aaciShip.id)} ({aaciKind})</span>
      </OverlayTrigger>
    )
  }
}

class AerialTable extends React.Component {
  render() {
    const a = this.props.aerial
    if (a == null) return <div />

    return (
      <div className={"aerial-table"}>
        <Row className={"aerial-row"}>
          <span>
            <PlaneCount init={a.fPlaneInit1} now={a.fPlaneNow1} />
          </span>
          <span>{a.fContact ? `${__("Contact")}: ${getItemName(a.fContact)}` : ''}</span>
          <span>{AirControlName[a.control]}</span>
          <span>{a.eContact ? `${__("Contact")}: ${getItemName(a.eContact)}` : ''}</span>
          <span>
            <PlaneCount init={a.ePlaneInit1} now={a.ePlaneNow1} />
          </span>
        </Row>
        <Row className={"aerial-row"}>
          <span>
            <PlaneCount init={a.fPlaneInit2} now={a.fPlaneNow2} />
          </span>
          <span></span>
          <span><AntiAirCICell aerial={a} /></span>
          <span></span>
          <span>
            <PlaneCount init={a.ePlaneInit2} now={a.ePlaneNow2} />
          </span>
        </Row>
      </div>
    )
  }
}


class ShipInfo extends React.Component {
  render() {
    const {ship} = this.props
    if (ship == null) return <span />

    return (
      <span>
        <span>{getShipName(ship.id)}</span>
        <span className="position-indicator">{`(${ship.pos})`}</span>
      </span>
    )
  }
}

class DamageInfo extends React.Component {
  render() {
    const {type, damage, hit} = this.props
    let elements = []
    elements.push(<span key={-1}>{AttackTypeName[type]}</span>)
    elements.push(<span key={-2}>{" ("}</span>)
    damage.map((damage, i) => {
      let cls = ''
      if (hit[i] == HitType.Miss)
        damage = "miss"
      if (hit[i] == HitType.Critical)
        cls = 'critical'
      elements.push(<span key={10 * i + 1} className={cls}>{damage}</span>)
      elements.push(<span key={10 * i + 2}>{", "}</span>)
    })
    elements.pop()  // Remove last comma
    elements.push(<span key={-3}>{")"}</span>)

    return <span>{elements}</span>
  }
}

class AttackRow extends React.Component {
  render() {
    const {type, fromShip, toShip, fromHP, toHP, damage, hit, useItem} = this.props.attack
    const {maxHP} = toShip
    const totalDamage = damage.reduce((p, x) => p + x)
    // Is enemy attack?
    return (toShip.owner === ShipOwner.Ours) ? (
      <Row className={"attack-row"}>
        <span><HPBar max={maxHP} from={fromHP} to={toHP} damage={totalDamage} item={useItem} /></span>
        <span><ShipInfo ship={toShip} /></span>
        <span><FontAwesome name='long-arrow-left' /></span>
        <span><DamageInfo type={type} damage={damage} hit={hit} /></span>
        <span></span>
        <span><ShipInfo ship={fromShip} /></span>
        <span></span>
      </Row>
    ) : (
      <Row className={"attack-row"}>
        <span></span>
        <span><ShipInfo ship={fromShip} /></span>
        <span></span>
        <span><DamageInfo type={type} damage={damage} hit={hit} /></span>
        <span><FontAwesome name='long-arrow-right' /></span>
        <span><ShipInfo ship={toShip} /></span>
        <span><HPBar max={maxHP} from={fromHP} to={toHP} damage={totalDamage} item={useItem} /></span>
      </Row>
    )
  }
}

class AttackTable extends React.Component {
  render() {
    const {attacks} = this.props
    return (attacks == null || attacks.length == 0) ? <div /> : (
      <div className={"attack-table"}>
        {attacks.map((attack, i) => <AttackRow key={i} attack={attack} />)}
      </div>
    )
  }
}


class StageTable extends React.Component {
  render() {
    const {stage} = this.props
    if (stage == null) return <div />

    let tables = []
    let title = null

    switch (stage.type) {
    case StageType.Engagement:
      break
    case StageType.Aerial:
      if (stage.subtype === StageType.Assault)
        title = `${__('Aerial Combat')} - ${__('Jet Air Assault')}`
      else
        title = `${__('Aerial Combat')}`
      break
    case StageType.Torpedo:
      if (stage.subtype == StageType.Opening)
        title = __('Opening Torpedo Salvo')
      else
        title = __('Torpedo Salvo')
      break
    case StageType.Shelling:
      switch (stage.subtype) {
      case StageType.Main:
        title = `${__('Shelling')} - ${__('Main Fleet')}`
        break
      case StageType.Escort:
        title = `${__('Shelling')} - ${__('Escort Fleet')}`
        break
      case StageType.Night:
        title = __('Night Combat')
        break
      case StageType.Opening:
        title = __('Opening Anti-Sub')
        break
      default:
        title = __('Shelling')
      }
      break
    case StageType.Support:
      switch (stage.subtype) {
      case StageType.Aerial:
        title = `${__('Expedition Supporting Fire')} - ${__('Aerial Support')}`
        break
      case StageType.Shelling:
        title = `${__('Expedition Supporting Fire')} - ${__('Shelling Support')}`
        break
      case StageType.Torpedo:
        title = `${__('Expedition Supporting Fire')} - ${__('Torpedo Support')}`
        break
      }
      break
    case StageType.LandBase:
      if (stage.subtype === StageType.Assault)
        title = `${__('Land Base Air Corps')} - ${__('Jet Air Assault')}`
      else
        title = `${__('Land Base Air Corps')} - No.${stage.kouku.api_base_id}`
      break
    }

    if (stage.engagement != null)
      tables.push(<EngagementTable key={2} engagement={stage.engagement} />)
    if (stage.aerial != null)
      tables.push(<AerialTable key={1} aerial={stage.aerial} />)
    if (stage.attacks != null)
      tables.push(<AttackTable key={0} attacks={stage.attacks} />)
    return (
      <div className={"stage-table"}>
        <div className={"stage-title"}>{title}</div>
        {tables}
        <hr />
      </div>
    )
  }
}


class DetailArea extends React.Component {
  render() {
    const {simulator, stages} = this.props
    let tables = []
    if (stages != null)
      tables = stages.map((stage, i) => (
        <StageTable key={i} stage={stage} simulator={simulator} />
      ))

    return (
      <div id="detail-area">
        <Panel header={__("Battle Detail")}>
          {tables.length > 0 ? tables : __("No battle")}
        </Panel>
      </div>
    )
  }
}

module.exports = DetailArea