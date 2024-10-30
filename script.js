const questions = [
  { id: 'P1', question: 'Apakah air berkeruh?', cfPak: -0.8 }, 
  { id: 'P2', question: 'Apakah air panas/tidak sejuk?', cfPak: -0.9 }, 
  { id: 'P3', question: 'Apakah air berwarna?', cfPak: -0.75 }, 
  { id: 'P4', question: 'Apakah air berasa?', cfPak: -0.6 }, 
  { id: 'P5', question: 'Apakah air berbau/bau amis?', cfPak: -0.85 }, 
  { id: 'P6', question: 'Apakah air tidak netral?', cfPak: -0.95 },
  { id: 'P7', question: 'Apakah air memiliki nilai TDS sedang?', cfPak: 0.7 }, 
  { id: 'P8', question: 'Apakah air memiliki nilai TSS rendah?', cfPak: 0.8 } 
];

function generateQuestions() {
  let questionHTML = '';
  questions.forEach((q, index) => {
      questionHTML += `
          <div class="question">
              <label>${q.question}</label>
              <input type="radio" name="q${index}" value="1"> Iya<br>
              <input type="radio" name="q${index}" value="0.5"> Aga-aga<br>
              <input type="radio" name="q${index}" value="0"> Tidak<br>
          </div>`;
  });
  document.getElementById('questions').innerHTML = questionHTML;
}
generateQuestions();

// Menghitung CF
function calculateCF() {
  let cfTotal = 0;
  let previousCF = null;

  questions.forEach((q, index) => {
      const userCF = parseFloat(document.querySelector(`input[name="q${index}"]:checked`)?.value || 0);
      const cfRule = q.cfPak;

      // Menghitung CF untuk setiap aturan
      let cf = cfRule * userCF;

      // Gabungan CF total menggunakan kombinasi paralel
      if (previousCF === null) {
          previousCF = cf;
      } else {
          previousCF = previousCF + cf - (previousCF * cf); // Rumus kombinasi paralel
      }
  });

  cfTotal = previousCF;

  let resultText = `<h3>Kesimpulan:</h3><p>CF Total: ${cfTotal.toFixed(2)}</p>`;
  let adviceText = '';

  if (cfTotal >= 0.7) {
      resultText += `<p>Lingkungan sangat mendukung untuk pemeliharaan ikan mas koki.</p>`;
      adviceText = `<h3>Saran:</h3><p>Lanjutkan pemeliharaan seperti biasa dan lakukan pemantauan rutin untuk menjaga kualitas lingkungan.</p>`;
  } else if (cfTotal >= 0.5) {
      resultText += `<p>Lingkungan cukup baik, tetapi ada beberapa hal yang dapat diperbaiki.</p>`;
      adviceText = `<h3>Saran:</h3><p>Periksa parameter seperti suhu dan pH, serta lakukan penggantian air secara berkala untuk menjaga stabilitas lingkungan.</p>`;
  } else if (cfTotal >= 0.3) {
      resultText += `<p>Lingkungan kurang mendukung, perlu perhatian lebih lanjut.</p>`;
      adviceText = `<h3>Saran:</h3><p>Periksa lebih rinci setiap parameter air, termasuk kejernihan, suhu, TDS, dan TSS, serta pertimbangkan untuk melakukan pembersihan lebih sering.</p>`;
  } else {
      resultText += `<p>Lingkungan tidak mendukung untuk pemeliharaan ikan mas koki.</p>`;
      adviceText = `<h3>Saran:</h3><p>Disarankan untuk mengganti air sepenuhnya dan memeriksa parameter penting untuk memastikan lingkungan yang aman bagi ikan.</p>`;
  }

  document.getElementById('result').innerHTML = resultText;
  document.getElementById('advice').innerHTML = adviceText;
}
    document.getElementById('enter-button').addEventListener('click', () => {
    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('main-page').style.display = 'block';
    generateQuestions();
});
document.getElementById('calculate-button').addEventListener('click', calculateCF);
