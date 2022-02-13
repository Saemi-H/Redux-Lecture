// build with Vanilla js


// create function for store
function createStore(worker){
    let state 
    let handlers = [] ; //pub and subscribe (함수들 저장 -> 데이터 바뀌면 해당 함수 호출)

    function send(action){ // 바깥으로 state 내보내주는 함수 만들어야함
        state = worker(state, action)  //새로운 상태를 항상 만들어 준다. 데이터 바뀜
        handlers.forEach(handler => handler()); //data가 바뀌는 곳에서 해당 함수 호출
    }
    function getState(){// createStore 밖에서 state 값을 호출하기 위해 함수 만들어야함
        return state;  
    }
    function subscribe(handler){ //받은 handler 함수들 배열에 추가
        handlers.push(handler);
    }

    return {
        send,
        getState,
        subscribe
    };
}

// state를 바꾸는 logic은 개발자가 알고 있다
function worker(state ={count : 0}, action){
    // do something with state
    switch(action.type){
        case 'increase':
            return {...state, count: state.count + 1}
        default:
            return {...state};
    }
    // if(action.type === 'increase'){//많은 case 들이 생기므로 switch > if
    //     // state 값을 그대로 return 하면 같은 문제를 발생 -> 새로운 상태를 반환해야함
    // return {...state, count : state.count + 1};
    // }
     
};

// define store
const store = createStore(worker);

//console.log(store.getState()); //subscribe로 getState 호출 
store.subscribe(function () {
    console.log(store.getState()); //data가 바뀔 때 호출하는 함수 만들어야 함. data가 바뀌는 곳에서  
})

//store.send(action);
store.send({type: 'increase'}); //Redux 가 정해놓은 규칙
//store.send(); //Action 이 필요. 어떤 데이터를 바꿔달라고 할 지 힌트 필요
