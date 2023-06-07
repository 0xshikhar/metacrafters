// pragma circom 2.0.0;

include "../../node_modules/circomlib/circuits/gates.circom";

template Polycircuit () {
    signal input a;
    signal input b;
    signal x;
    signal y;
    signal output q;

    component andGate = AND();
    component notGate = NOT();
    component orGate = OR();

    andGate.a <== a;
    andGate.b <== b;
    x <== andGate.out;

    notGate.in <== b;
    y <== notGate.out;

    orGate.a <== x;
    orGate.b <== y;
    q <== orGate.out;
}

component main = Polycircuit();