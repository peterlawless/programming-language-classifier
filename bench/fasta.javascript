// The Computer Language Benchmarks Game
// http://benchmarksgame.alioth.debian.org/
//
//  Contributed by Ian Osgood

var last = 42, A = 3877, C = 29573, M = 139968;

function rand(max) {
  last = (last * A + C) % M;
  return max * last / M;
}

var ALU =
  "GGCCGGGCGCGGTGGCTCACGCCTGTAATCCCAGCACTTTGG" +
  "GAGGCCGAGGCGGGCGGATCACCTGAGGTCAGGAGTTCGAGA" +
  "CCAGCCTGGCCAACATGGTGAAACCCCGTCTCTACTAAAAAT" +
  "ACAAAAATTAGCCGGGCGTGGTGGCGCGCGCCTGTAATCCCA" +
  "GCTACTCGGGAGGCTGAGGCAGGAGAATCGCTTGAACCCGGG" +
  "AGGCGGAGGTTGCAGTGAGCCGAGATCGCGCCACTGCACTCC" +
  "AGCCTGGGCGACAGAGCGAGACTCCGTCTCAAAAA";

var IUB = {
  a:0.27, c:0.12, g:0.12, t:0.27,
  B:0.02, D:0.02, H:0.02, K:0.02,
  M:0.02, N:0.02, R:0.02, S:0.02,
  V:0.02, W:0.02, Y:0.02
}

var HomoSap = {
  a: 0.3029549426680,
  c: 0.1979883004921,
  g: 0.1975473066391,
  t: 0.3015094502008
}

function makeCumulative(table) {
  var last = null;
  for (var c in table) {
    if (last) table[c] += table[last];
    last = c;
  }
}

function fastaRepeat(n, seq) {
  var seqi = 0, lenOut = 60;
  while (n>0) {
    if (n<lenOut) lenOut = n;
    if (seqi + lenOut < seq.length) {
      print( seq.substring(seqi, seqi+lenOut) );
      seqi += lenOut;
    } else {
      var s = seq.substring(seqi);
      seqi = lenOut - s.length;
      print( s + seq.substring(0, seqi) );
    }
    n -= lenOut;
  }
}

function fastaRandom(n, table) {
  var line = new Array(60);
  makeCumulative(table);
  while (n>0) {
    if (n<line.length) line = new Array(n);
    for (var i=0; i<line.length; i++) {
      var r = rand(1);
      for (var c in table) {
        if (r < table[c]) {
          line[i] = c;
          break;
        }
      }
    }
    print( line.join('') );
    n -= line.length;
  }
}

var n = arguments[0]

print(">ONE Homo sapiens alu")
fastaRepeat(2*n, ALU)

print(">TWO IUB ambiguity codes")
fastaRandom(3*n, IUB)

print(">THREE Homo sapiens frequency")
fastaRandom(5*n, HomoSap)
