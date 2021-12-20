document.addEventListener("DOMContentLoaded", async e => {
    const elapsed_times = document.getElementById("elapsed_times");
    const average = document.getElementById("average");
  
    // ナンスを送信する
    const sendNonce = async () => {
      try {
        const response = fetch("/nonce", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "nonce": 1
          })
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return responce.statusText;
        
      } catch (err) {
        error.textContent = `Error: post ${err.message}`;
        error.style.display = "block";
      } finally {
        
      }
    };
    // 平均処理時間を取得する
    const getAverage = async () => {
        try {
            const response = await fetch("/average");
            if (!response.ok) {
                throw new Error(response.statusText);
            }
        
            const data = await response.json();
            if (data.Error) {
                throw new Error(data.Error);
            }
            average.textContent = data.average
            
        } catch (error) {
            
        } finally{
        
        }

    }
    //(セッションを作っていないので，)受け取り時間を削除する
    const deleteRecvieveTimes = async () => {
      try {
        const response = await fetch("/delete");
        if (!response.ok){
          throw new Error(response.statusText);
        }
      } catch (error) {
        
      } finally{

      }
    }

    const getSalt = async () => {
      try {
        const response = await fetch("/salt");
        if(!response.ok){
          throw new Error(response.statusText);
        }
        const data = await response.json();
        if(data.Error){
          throw new Error(data.Error);
        }

        return data.salt
      } catch (error) {
        
      }
    }

    const listRecieve_time = async () => {
      try {
        const responce = await fetch("/recieve_times");
        if (!responce.ok) {
          throw new Error(responce.statusText);
        }
    
        const json = await responce.json();
        if (json.Error) {
          throw new Error(json.Error);
        }
        let elapsed_time;
        for(let i in json){
          elapsed_time = document.createElement('div');
          elapsed_time.textContent = json[i];
          elapsed_times.appendChild(elapsed_time);
        }  
      } catch (error) {
        
      }
    }

    //  get a salt from server
    try {
      //saltを得る
      salt = getSalt();
  
      //todo:pow benchmark
  
      let status = [];
      console.time('sendnonce');
      //POSTを200回送る
      for(let i = 0; i < 100; i++){
        status.push(sendNonce());
      }
      await Promise.all(status);
      console.timeEnd('sendnonce')
      //受け取り時間(recieve_time)の一覧
      listRecieve_time();


      getAverage();
      deleteRecvieveTimes();
    } catch (err) {
      error.textContent = `Error: get ${err.message}`;
      error.style.display = "block";
    }
  });
  