'use client';

import { useState, useMemo } from 'react';
import { programs } from './data/programs';
import './styles/globals.css';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedCountry, setSelectedCountry] = useState('todos');

  const filtered = useMemo(() => {
    return programs.filter(program => {
      const matchSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = selectedCategory === 'todos' || program.category === selectedCategory;
      const matchCountry = selectedCountry === 'todos' || program.country === selectedCountry;
      return matchSearch && matchCategory && matchCountry;
    });
  }, [searchTerm, selectedCategory, selectedCountry]);

  const recommendations = filtered.slice(0, 3);
  const categories = ['todos', ...new Set(programs.map(p => p.category))];
  const countries = ['todos', ...new Set(programs.map(p => p.country))];

  return (
    <div className="container">
      <header className="header">
        <h1>🎓 EduFind Latinoamérica</h1>
        <p>Encuentra tu mejor opción educativa: becas, intercambios y programas</p>
      </header>

      <main className="main">
        <section className="search-section">
          <input
            type="text"
            placeholder="Busca becas, intercambios, cursos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <div className="filters">
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="filter-select">
              <option value="todos">📚 Todas las categorías</option>
              {categories.slice(1).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="filter-select">
              <option value="todos">🌎 Todos los países</option>
              {countries.slice(1).map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        </section>

        {recommendations.length > 0 && (
          <section className="recommendations">
            <h2>✨ Recomendaciones para ti</h2>
            <div className="cards-grid">
              {recommendations.map(program => (
                <div key={program.id} className="card recommended">
                  <span className="badge">{program.category}</span>
                  <h3>{program.title}</h3>
                  <p className="country">📍 {program.country}</p>
                  <p className="level">Nivel: {program.level}</p>
                  <p className="description">{program.description}</p>
                  <div className="info">
                    <span>💰 {program.scholarship ? 'Con beca' : 'Sin beca'}</span>
                    <span>⏱️ {program.duration}</span>
                  </div>
                  <button className="btn">Ver más →</button>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="results">
          <h2>📖 Resultados ({filtered.length})</h2>
          {filtered.length === 0 ? (
            <p className="no-results">No encontramos programas que coincidan con tu búsqueda</p>
          ) : (
            <div className="cards-grid">
              {filtered.map(program => (
                <div key={program.id} className="card">
                  <span className="badge">{program.category}</span>
                  <h3>{program.title}</h3>
                  <p className="country">📍 {program.country}</p>
                  <p className="level">Nivel: {program.level}</p>
                  <p className="description">{program.description}</p>
                  <div className="info">
                    <span>💰 {program.scholarship ? 'Con beca' : 'Sin beca'}</span>
                    <span>⏱️ {program.duration}</span>
                  </div>
                  <button className="btn">Ver más →</button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>© 2024 EduFind Latinoamérica - Encuentra tu mejor opción educativa</p>
      </footer>
    </div>
  );
}
