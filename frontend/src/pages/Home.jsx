import { useState, useEffect } from "react"
import api from '../api'
import Note from "../components/Note"
import '../styles/Home.css'

function Home(){
    const [notes, setNotes] = useState([])
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')

    useEffect(() => {
        getNotes()
    }, [])

    const getNotes = () => {
        api
            .get('api/notes/')
            .then((res) => res.data)
            .then((data) => {setNotes(data); console.log(data)})
            .catch((err) => alert(err))
    }

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) {
                    alert('Note deleted!')
                    getNotes()
                }
                else alert('Failed to delete note')
            })
            .catch((error) => alert(error))

    }

    const createNote = (e) => {
        e.preventDefault()
        api
            .post('/api/notes/', {content, title})
            .then((res) => {
                if (res.status === 201) {
                    alert('Note Created')
                    getNotes()
                }
                else alert('Failed to create note')
            })
            .catch((err) => {
                console.error(err.response || err); // Log response details
                alert('An error occurred while creating the note');
            });
            
    }

    return (
        <>
        <div>
            <div>
                <h2>Notes</h2>
                {notes.map((note) => <Note note={note} onDelete={deleteNote} key={note.id} />)}
            </div>
            <h2>create a note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title: </label>
                <br />
                <input 
                type="text" 
                id="title" 
                name="title"
                value={title} 
                required 
                onChange={(e) => setTitle(e.target.value)}
                 />
                 <br />
                 <label htmlFor="content">Content: </label>
                 <br />
                 <textarea 
                 name="content" 
                 id="content"
                 required
                 value={content}
                 onChange={(e) => setContent(e.target.value)}
                 ></textarea>
                 <br />
                 <input 
                 type="submit"
                 value='Submit' />
            </form>
        </div>
        </>
    )
}

export default Home