// app.js placeholder

// ===== Profil User =====
let profile = {};
let visitCount = parseInt(localStorage.getItem('visitCount')||0)+1;
localStorage.setItem('visitCount', visitCount);

const nameInput=document.getElementById('name');
const genderInput=document.getElementById('gender');
const ageInput=document.getElementById('age');
const heightInput=document.getElementById('height');
const weightInput=document.getElementById('weight');
const targetWeightInput=document.getElementById('targetWeight');
const bmrDisplay=document.getElementById('bmr-display');
const calorieGoalDisplay=document.getElementById('calorie-goal-display');
const visitDisplay=document.getElementById('visit-count');

// Simpan Profil
document.getElementById('save-profile').addEventListener('click', ()=>{
    profile={
        name:nameInput.value,
        gender:genderInput.value,
        age:parseInt(ageInput.value),
        height:parseInt(heightInput.value),
        weight:parseInt(weightInput.value),
        targetWeight:parseInt(targetWeightInput.value)
    };
    localStorage.setItem('profile', JSON.stringify(profile));
    updateProfileDisplay();
});

// Load Profil
const savedProfile=JSON.parse(localStorage.getItem('profile'));
if(savedProfile) profile=savedProfile;

function updateProfileDisplay(){
    if(!profile) return;
    nameInput.value=profile.name||'';
    genderInput.value=profile.gender||'';
    ageInput.value=profile.age||'';
    heightInput.value=profile.height||'';
    weightInput.value=profile.weight||'';
    targetWeightInput.value=profile.targetWeight||'';

    let bmr;
    if(profile.gender==='Pria') bmr=10*profile.weight+6.25*profile.height-5*profile.age+5;
    else if(profile.gender==='Wanita') bmr=10*profile.weight+6.25*profile.height-5*profile.age-161;
    else bmr=2000;

    bmrDisplay.textContent=`BMR: ${Math.round(bmr)} kcal/hari`;
    calorieGoalDisplay.textContent=`Target Kalori Harian: ${Math.round(bmr-500)} kcal`;
    visitDisplay.textContent=`Kamu sudah membuka aplikasi ini: ${visitCount} kali`;

    showDailyMotivation();
    showActiveMotivation();
}

updateProfileDisplay();

// ===== Motivasi Harian =====
const motivations = [
  "Setiap langkah kecil mendekatkanmu ke tujuan!",
  "Konsistensi lebih penting daripada kesempurnaan.",
  "Tubuh sehat dimulai dari pilihan hari ini.",
  "Makan sehat adalah investasi untuk masa depanmu.",
  "Jangan menyerah, hasil terbaik butuh waktu.",
  "Setiap kalori dihitung, setiap usaha berarti.",
  "Perubahan besar dimulai dari kebiasaan kecil.",
  "Senyum, semangat, dan tetap di jalur dietmu!"
];

function showDailyMotivation(){
  const today = new Date().toISOString().split('T')[0];
  let todayMotivation = JSON.parse(localStorage.getItem('todayMotivation')) || {};
  if(todayMotivation.date!==today){
    const index=Math.floor(Math.random()*motivations.length);
    todayMotivation={date:today,text:motivations[index]};
    localStorage.setItem('todayMotivation',JSON.stringify(todayMotivation));
  }
  document.getElementById('motivation-daily').textContent=todayMotivation.text;
}

// ===== Motivasi Anti-Malas =====
const activeMotivations = [
  "Bangun dan bergerak sekarang, jangan menunda!",
  "Setiap langkah kecil lebih baik daripada tidak sama sekali.",
  "Tubuh sehat butuh aktivitas, jangan malas!",
  "Latihan sedikit hari ini lebih baik daripada tidak sama sekali.",
  "Geraklah sekarang, masa depan tubuhmu berterima kasih!",
  "Semangat! Energi positif datang dari aksi nyata.",
  "Jangan menunggu motivasi, buatlah motivasi dengan bergerak!"
];

function showActiveMotivation(){
  const index=Math.floor(Math.random()*activeMotivations.length);
  document.getElementById('motivation-active').textContent=activeMotivations[index];
}

setInterval(showActiveMotivation,10000);

// ===== Tabs =====
function openTab(evt, tabName){
  const tabcontent=document.getElementsByClassName('tabcontent');
  for(let i=0;i<tabcontent.length;i++) tabcontent[i].style.display='none';
  const tablinks=document.getElementsByClassName('tablink');
  for(let i=0;i<tablinks.length;i++) tablinks[i].className=tablinks[i].className.replace(' active','');
  document.getElementById(tabName).style.display='block';
  evt.currentTarget.className+=' active';
}

// Buka tab pertama otomatis
document.getElementsByClassName('tablink')[0].click();
