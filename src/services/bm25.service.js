const natural = require('natural');
const fs = require('fs');
const { BM25 } = natural;

class BM25Service {
    // constructor(documents) {
    //     this.bm25 = new natural.BayesClassifier();
    //     documents.forEach(doc => this.bm25.addDocument(doc.split(' ')));
    // }

    // rankDocuments(query) {
    //     const queryWords = query.split(' ');  // Split query into words
    //     const scores = this.bm25.getDocumentScores(queryWords); // Get scores for each document
    //     // Store document scores and append in a file
    //     fs.writeFileSync('document-scores.json', JSON.stringify(scores, query, 2));
    //     // Pair each score with its document index
    //     const rankedDocs = scores.map((score, index) => ({
    //         document: documents[index],
    //         score: score
    //     }));

    //     // Sort the documents based on score in descending order
    //     rankedDocs.sort((a, b) => b.score - a.score);

    //     return rankedDocs;
    // }
    

    // rankUsingBM25(query) {
    //     return this.bm25.getClassifications(query.split(' '));
    // }

    // saveScoresToFile(query, filePath) {
    //     const scores = this.calculateBM25Scores(query);
    //     fs.writeFileSync(filePath, JSON.stringify(scores, null, 2));
    // }
}

// // Example usage
// const documents = [
//     "the quick brown fox",
//     "jumped over the lazy dog",
//     "lorem ipsum dolor sit amet"
// ];

// const bm25Service = new BM25Service(documents);
// const query = "quick fox";
// const filePath = '/path/to/output/scores.json';
// bm25Service.saveScoresToFile(query, filePath);

// console.log('BM25 Scores saved to:', filePath);