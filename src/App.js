
import './App.css';
import { useState } from 'react'
import logo from './images/fishLogo.png';
import deadFish from './images/deadFish.jpeg';
import dyingFish from './images/dyingFish.jpeg'
import happyFish from './images/happyFish.jpeg'
import nervousFish from './images/nervousFish.jpeg'



function App() {
  const date = new Date();
  var [waterToday, setWaterToday] = useState(0);
  var [state, setState] = useState(0);
  var timeHour= date.getHours() - 6; //TODO: a better way to code this? could also try to include minute accuracy
  var user = { //TODO user input for these things? would unfortunately require another screen..
    name: "Fatma",
    goalWater: 15,
    numHours: 16,
  }
  var currentTargetWater =  Math.round(user.goalWater/user.numHours) * timeHour;
  var difference = Math.round(currentTargetWater - waterToday);
  var onTrack = Boolean(difference <= 0);

  function addWater(){
    setWaterToday(parseInt(waterToday) + 1);
  }

  function logWater(e){ //TODO: maybe take things in as a string and parse them...
    setState(e.target.value);
    setWaterToday(parseInt(waterToday) + parseInt(state));
  }
  
  return (
    <div className="App">
      <header className = "App-header">
        <img src={logo} className = "logo" alt="fish logo here"></img>
        <text id = "main-title">{user.name}'s Fish <br></br>
          Goal: {user.goalWater} cups of water a day
          <br></br>
        </text>
      </header>
      <body className="App-body">
        <MyButton count = {waterToday} onClick = {addWater} > drank a cup of water </MyButton>
        <NumberInput state = {state} onChange={logWater} />
        <text> <br></br>
        So far, i should have drank {currentTargetWater} cups of water today  <br></br>
        i have had {waterToday} cups of water
        <br></br>
        <FishState onTrack = {onTrack} waterToday = {waterToday} goalWater = {currentTargetWater} difference = {difference}/>
        <br></br>
        {!onTrack &&
          <text> drink {difference} cups to catch up </text>
        }
        </text>
      </body>
    </div>
  );
}


function MyButton({count, onClick}){
  return <button onClick = {onClick} >i drank water</button>
}
function FishState({onTrack, waterToday, goalWater}){
  if (onTrack){
    return (
      <HappyFish/>
    )
  }
  else if (waterToday > (0.6 * goalWater)) {
    return(
      <NervousFish/>
    )
  }
  else if(waterToday > (0.3 * goalWater)){
    return (
      <DyingFish/>
    )
  }
  else{
    return (
      <DeadFish/>
    )
  }

}
function HappyFish(){
  return (
  <><text>The fish is happy</text><img src={happyFish} className='fishpic' alt="happy fish here"></img></>
  )
}
function NervousFish(){
  return (
  <><text>The fish is nervous....</text><img src={nervousFish} className='fishpic' alt="nervous fish here"></img></>
  )
}
function DyingFish(){
  return (
    <><text>The fish is dying....</text><img src={dyingFish} className='fishpic' alt="dying fish here"></img></>
    )
}
function DeadFish(){
  return (
    <><text>The fish is DEAD</text><img src={deadFish} className='fishpic' alt="dead fish here"></img></>
    )
}

function NumberInput({state, onChange}) {
  return (
    <div>
      <label htmlFor={'my-input'}>Log cups of water: </label>
      <input
        id={'my-input'}
        type={'number'}
        value={state}
        placeholder={'Log water?'}
        onChange = {onChange}
      />
      <br />
      <br />
      numberInput state is: {state}
    </div>
  )
}

export default App;
