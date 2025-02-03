import { useEffect } from "react";

// const BACKEND_URL = process.env.PLASMO_PUBLIC_BACKEND_URL;
const BACKEND_URL = 'https://linked-genie.onrender.com';

const LinkedInCommenter = () => {
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const commentBoxes = document.getElementsByClassName("comments-quick-comments");

      Array.from(commentBoxes)
        .filter((commentBox) => !commentBox.hasAttribute("data-mutated"))
        .forEach((commentBox) => {
          try {
            commentBox.setAttribute("data-mutated", "true");
            addSuggestionButton(commentBox);
          } catch (error) {
            alert('Error processing comment box: ' + error);
          }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  const addSuggestionButton = (commentBox) => {
    const ul = commentBox.querySelector('ul.comments-quick-comments__container');
    if (!ul) {
      console.log('No ul with class comments-quick-comments__container found');
      return;
    }

    // Create icon element
    const icon = document.createElement('div');
    icon.innerHTML = '💡';
    icon.style.cursor = 'pointer';
    icon.style.marginTop = '-1px';
    icon.style.marginLeft = '8px';
    icon.style.marginRight = '-5px';
    icon.style.fontSize = '30px';
    icon.style.display = 'flex';
    icon.style.alignItems = 'center';
    icon.style.minWidth = 'fit-content';


    icon.addEventListener('click', async () => {
      icon.style.opacity = '0.5';
      icon.style.pointerEvents = 'none';


      const postContainer = commentBox.closest('.feed-shared-update-v2');
      if (postContainer) {
        const postContent = postContainer.querySelector('.feed-shared-update-v2__description');
        if (postContent) {
          const textContent = postContent.textContent.trim();

          try {
            console.log('Sending request to API', textContent);
            const response = await fetch(`${BACKEND_URL}/api/generate-comments`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                postData: textContent
              })
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('API Response:', data.comments);


            const templateLi = ul.querySelector('li');
            if (!templateLi) {
              console.log('No template li found');
              return;
            }


            data.comments.forEach(comment => {
              const newLi = templateLi.cloneNode(true);

              const buttonSpan = newLi.querySelector('button span.artdeco-button__text');
              if (buttonSpan) {
                buttonSpan.textContent = comment;
              }

              const outerDiv = ul.closest('.update-v2-social-activity');
              if (!outerDiv) {
                console.log('Outer div not found');
                return;
              }

              const commentInput = outerDiv.querySelector('.ql-editor[contenteditable="true"]');
              if (!commentInput) {
                console.log('Comment input not found');
                return;
              }

              // Add click event listener to the button
              const button = newLi.querySelector('button');
              if (button && commentInput) {
                button.addEventListener('click', (e) => {
                  e.preventDefault();
                  const p = document.createElement('p');
                  p.textContent = comment;

                  commentInput.innerHTML = '';
                  commentInput.appendChild(p);

                  commentInput.classList.remove('ql-blank');

                  commentInput.dispatchEvent(new Event('input', { bubbles: true }));
                });
              }

              icon.insertAdjacentElement('afterend', newLi);
            });

            ul.scrollLeft = 0;

            icon.remove();
          } catch (error) {
            console.error('Error calling API:', error.message);
          }
        } else {
          console.log('Post content element not found');
        }
      } else {
        console.log('Post container not found');
      }
    });

    ul.insertBefore(icon, ul.firstChild);
  };

  return null;
};

export default LinkedInCommenter;
