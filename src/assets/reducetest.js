let val = [200, 210, 250, 220, 190]

//let diff = val.reduce((a,b)=>a-b)
//let low = val.reduce((a,b)=>a<b?a:b)

let  diff = new Array(5).fill(0)
for (var i = 0; i < diff.length; i++) {
    diff[i] = new Array(5).fill(0);
  }

for(let i=0;i<val.length-1;i++)
    {
     for(let j=i+1;j<val.length;j++)
     {
         diff[i][j] = -parseInt(val[i])+parseInt(val[j])
     }
    }

let highDiff = new Array(5)    

for(let i=0;i<5;i++)
{
    highDiff[i]=diff[i].reduce((a,b)=>a>b?a:b)
}

max_highDiff = highDiff.reduce((a,b)=>a>b?a:b)

console.log(typeof(diff[0]))
console.log(highDiff)
console.log(max_highDiff)
