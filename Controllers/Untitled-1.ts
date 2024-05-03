// req.body.userName
            const RechercheUserFavoris = await Favoris.findOne({userName: "Landry" })
            console.log("testy", RechercheUserFavoris)
            if(RechercheUserFavoris){
                console.log("Ajout Fav", RechercheUserFavoris)
                // on recherche si l id existe dans les favoris
                //const AjoutFavoris = await Favoris.findOneAndUpdate({userName: RechercheUserFavoris.userName}, {$set})
               rechercheId = RechercheUserFavoris.Favoris.find(cableAuFavoris => cableAuFavoris.equals(req.params.id)) 
                    if(rechercheId){
                        const retirer = await Favoris.findOneAndUpdate({userName: RechercheUserFavoris.userName}, {$set: {Favoris: req.params.id}}, {new:true})   
                        res.status(202).json(retirer)
                        return
                    }else{
                        // on Ajoute
                        console.log("Ajout", RechercheUserFavoris)
                        RechercheUserFavoris.Favoris.push(req.params.id)
                        await RechercheUserFavoris.save()
                        res.status(202).json(RechercheUserFavoris)
                    }
            }else{
               const newUser= new Favoris({userName: req.body.userName})
               await newUser.save()
               const rechercheNewUser = await Favoris.findOne({userName: req.body.userName})
               rechercheNewUser.Favoris.push(req.params.id)
               rechercheNewUser.save()
               res.status(202).json(rechercheNewUser)
            }
        } catch (error) {
            res.status(500).json({message: error.message})
        }