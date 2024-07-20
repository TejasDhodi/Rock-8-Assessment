import React, { useEffect, useId, useState } from 'react'
import { useSelector } from 'react-redux'
import {ColorRing} from 'react-loader-spinner'
import axios from 'axios'
import '../Styles/Home.css'

const Home = () => {
    const [loading, setLoading] = useState(true);

    const [savedCategory, setSavedCategory] = useState([]);
    const [pageNums, setPageNums] = useState({
        currentPageNumber: 1,
        startPageNum: 1,
        endPageNum: 7
    });
    const [pageBtn, setpageBtn] = useState(null);

    const userId = useSelector(state => state.authentication.profile?.id);
    const userToken = useSelector(state => state.authentication.authToken)
    console.log('user id : ', userId);

    let categories = [
        'Jewelery', 'Clothing', 'Tools', 'Beauty', 'Health', 'Outdoors', 'Computers', 'Baby', 'Games',
        'Home', 'Kids', 'Jewelery', 'Music', 'Books', 'Sports', 'Movies', 'Beauty', 'Games', 'Sports',
        'Automotive', 'Tools', 'Baby', 'Clothing', 'Toys', 'Computers', 'Tools', 'Shoes', 'Movies',
        'Kids', 'Outdoors', 'Outdoors', 'Grocery', 'Games', 'Kids', 'Home', 'Electronics', 'Beauty',
        'Electronics', 'Books', 'Tools', 'Movies', 'Games', 'Tools', 'Games', 'Clothing', 'Garden',
        'Garden', 'Health', 'Garden', 'Automotive', 'Home', 'Garden', 'Garden', 'Computers', 'Industrial',
        'Outdoors', 'Kids', 'Kids', 'Toys', 'Sports', 'Grocery', 'Sports', 'Home', 'Baby', 'Sports',
        'Automotive', 'Shoes', 'Games', 'Outdoors', 'Jewelery', 'Computers', 'Automotive', 'Beauty',
        'Tools', 'Computers', 'Books', 'Grocery', 'Tools', 'Games', 'Outdoors', 'Computers', 'Automotive',
        'Electronics', 'Baby', 'Computers', 'Music', 'Baby', 'Sports', 'Kids', 'Baby', 'Industrial',
        'Garden', 'Grocery', 'Outdoors', 'Industrial', 'Outdoors', 'Movies', 'Grocery', 'Industrial',
        'Outdoors'
    ];

    const itemsPerPage = 6;
    const totalPage = Math.ceil(categories.length / itemsPerPage);
    const startIndex = (pageNums.currentPageNumber - 1) * itemsPerPage;
    const lastIndex = startIndex + itemsPerPage;

    const handleNext = () => {
        if (pageNums.currentPageNumber < totalPage) {
            setPageNums(prev => {
                const newCurrentPageNumber = prev.currentPageNumber + 1;
                const newStartPageNum = newCurrentPageNumber > prev.endPageNum ? prev.startPageNum + 1 : prev.startPageNum;
                const newEndPageNum = newCurrentPageNumber > prev.endPageNum ? prev.endPageNum + 1 : prev.endPageNum;
                return {
                    ...prev,
                    currentPageNumber: newCurrentPageNumber,
                    startPageNum: newStartPageNum,
                    endPageNum: newEndPageNum
                };
            });

            setpageBtn('next')

            setTimeout(() => {
                setpageBtn(null)
            }, 100);
        }
    };

    const handlePrevious = () => {
        if (pageNums.currentPageNumber > 1) {
            setPageNums(prev => {
                const newCurrentPageNumber = prev.currentPageNumber - 1;
                const newStartPageNum = newCurrentPageNumber < prev.startPageNum ? prev.startPageNum - 1 : prev.startPageNum;
                const newEndPageNum = newCurrentPageNumber < prev.startPageNum ? prev.endPageNum - 1 : prev.endPageNum;
                return {
                    ...prev,
                    currentPageNumber: newCurrentPageNumber,
                    startPageNum: newStartPageNum,
                    endPageNum: newEndPageNum
                };
            });

            setpageBtn('prev')

            setTimeout(() => {
                setpageBtn(null)
            }, 100);
        }
    };

    const handleSkip = (num) => {
        setPageNums(prev => {
            const newStartPageNum = num < prev.startPageNum ? num : (num > prev.endPageNum ? num - 6 : prev.startPageNum);
            const newEndPageNum = num < prev.startPageNum ? num + 6 : (num > prev.endPageNum ? num : prev.endPageNum);
            return {
                ...prev,
                currentPageNumber: num,
                startPageNum: newStartPageNum,
                endPageNum: newEndPageNum
            };
        });
    };

    const handleInputs = async (e, value) => {
        try {
            const { checked } = e.target;
            let updatedcategories = [];

            // Fetch Existing categories
            const { data: existingData } = await axios.get(`http://localhost:5000/api/v1/category/${userId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            const existingCategories = existingData.selectedCategory?.category || [];

            if (checked) {
                updatedcategories = [...new Set([...existingCategories, value])];
                console.log(value);
            } else {
                updatedcategories = existingCategories.filter(item => item !== value);
            }

            setSavedCategory(updatedcategories)

            // Sending update or new reuest
            const { data } = await axios.put('http://localhost:5000/api/v1/category/addCategory', {
                category: updatedcategories,
            }, {
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${userToken}`
                }
            })

            console.log('selected data to database', data);

        } catch (error) {
            console.log('Error ffrom handleINputs Home page : ', error);
        }
    };

    const getCategorydata = async () => {
        try {
            const { status, data } = await axios.get(`http://localhost:5000/api/v1/category/${userId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });

            let userSelectedCategory = [];
            if (status === 200) {
                setLoading(false)
                userSelectedCategory = data.selectedCategory?.category;
                console.log('data from getCategory :', data.selectedCategory?.category);
            }

            setSavedCategory(userSelectedCategory)
        } catch (error) {
            console.log('Error from get category data catch : ', error);
        }
    }

    useEffect(() => {
        if (userId) {
            getCategorydata()
            console.log(savedCategory);
        } else {
            setSavedCategory([])
        }
    }, [userId])

    return (
        <section id='category'>
            <div className="categoryContainer">
                <div className="categoryHeads">
                    <h1>Please mark your interests</h1>
                    <p>We will keep you notified</p>
                </div>
                <div className="categories">
                    <h3>My Saved Interests</h3>
                    {
                        categories.slice(startIndex, lastIndex).map((currElem, index) => (
                            <div className='categoryLists' key={index}>
                                <label className='custom-label' htmlFor={currElem.toLowerCase()}>{currElem}</label>
                                {loading ? <ColorRing
                                    visible={true}
                                    height="80"
                                    width="80"
                                    ariaLabel="color-ring-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="color-ring-wrapper"
                                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                                /> :
                                    <input
                                        type="checkbox"
                                        name={currElem.toLowerCase()}
                                        id={currElem.toLowerCase()}
                                        value={currElem}
                                        onChange={(e) => handleInputs(e, currElem)}
                                        checked={savedCategory && savedCategory.includes(currElem) || false}

                                    />
                                }
                            </div>
                        ))
                    }
                </div>

                <div className="controls">
                    <button type="button" className={pageBtn === 'prev' ? 'activePageBtn' : ''} onClick={handlePrevious}>{'<<<'}</button>
                    {Array.from({ length: Math.min(totalPage, 7) }, (_, index) => {
                        const pageNum = index + pageNums.startPageNum;
                        return (
                            <input
                                key={pageNum}
                                type="button"
                                value={pageNum}
                                onClick={() => handleSkip(pageNum)}
                                className={pageNums.currentPageNumber === pageNum ? 'pageNum activeNum' : 'pageNum'}
                            />
                        );
                    })}
                    <button type="button" className={pageBtn === 'next' ? 'activePageBtn' : ''} onClick={handleNext}>{'>>>'}</button>
                </div>

            </div>
        </section>
    );
}

export default Home;
